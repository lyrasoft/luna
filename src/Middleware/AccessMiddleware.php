<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Middleware;

use Closure;
use Lyrasoft\Luna\User\UserService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\UriInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Security\Exception\UnauthorizedException;
use Windwalker\Http\Response\RedirectResponse;
use Windwalker\Utilities\Options\OptionsResolverTrait;

/**
 * The AccessMiddleware class.
 *
 * Usage:
 *   AccessMiddleware::di(
 *       rules: ['can.access', 'can.login'],
 *       options: []
 *   )
 *
 *   AccessMiddleware::di(
 *       rules: fn (UserService $userService) => $userService->can('...'),
 *       options: []
 *   )
 *
 * Options:
 *   - exception: (string|Closure) Define the exception class name or use closure to throw custom exception.
 *   - error_code: (int) Set the error code for exception, default is: 403.
 */
class AccessMiddleware implements MiddlewareInterface
{
    use OptionsResolverTrait;

    public function __construct(
        protected ApplicationInterface $app,
        protected Closure|string|array $rules,
        array $options = []
    ) {
        $this->resolveOptions(
            $options,
            function (OptionsResolver $resolver) {
                $resolver->define('exception')
                    ->allowedTypes('string', 'closure')
                    ->default(UnauthorizedException::class);

                $resolver->define('error_code')
                    ->allowedTypes('int')
                    ->default(403);
            }
        );
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $allow = false;
        $userService = $this->app->service(UserService::class);

        if ($this->rules instanceof Closure) {
            $result = $this->app->call($this->rules);

            if ($result === false) {
                $this->raiseError();
            }

            if ($result instanceof UriInterface) {
                $result = new RedirectResponse($result);
            }

            if ($result instanceof ResponseInterface) {
                return $result;
            }

            return $handler->handle($request);
        }

        $rules = (array) $this->rules;

        foreach ($rules as $rule) {
            $allow = $allow || $userService->can($rule);
        }

        if (!$allow) {
            return $this->raiseError();
        }

        return $handler->handle($request);
    }

    protected function raiseError(): ResponseInterface
    {
        $exception = $this->options['exception'];

        if ($exception instanceof Closure) {
            return $this->app->call($exception);
        }

        throw new $exception('Access denied', $this->options['error_code']);
    }
}
