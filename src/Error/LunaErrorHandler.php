<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Error;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Error\ErrorManager;
use Windwalker\Core\Error\Handler\ErrorHandlerInterface;
use Windwalker\Core\Package\PackageHelper;
use Windwalker\Http\Response\HtmlResponse;
use Windwalker\Utilities\Queue\PriorityQueue;
use Windwalker\Utilities\Reflection\ReflectionHelper;

/**
 * The ErrorHandler class.
 *
 * @since  1.0
 */
class LunaErrorHandler implements ErrorHandlerInterface
{
    /**
     * Property package.
     *
     * @var  string
     */
    protected $package = null;

    /**
     * Method to get property Package
     *
     * @return  string
     */
    public function getPackage()
    {
        return $this->package;
    }

    /**
     * Method to set property package
     *
     * @param   string $package
     *
     * @return  void
     */
    public function setPackage($package)
    {
        $this->package = $package;
    }

    /**
     * __invoke
     *
     * @param  \Exception|\Throwable $exception
     *
     * @return  void
     * @throws \UnexpectedValueException
     * @throws \OutOfBoundsException
     * @throws \InvalidArgumentException
     */
    public function __invoke($exception)
    {
        if (!$package = static::getPackage()) {
            $package = LunaHelper::getFrontendPackage(true);
        }

        $package = PackageHelper::getPackage($package);

        $resolver = $package->getMvcResolver();

        $resolver->addNamespace(ReflectionHelper::getNamespaceName(LunaHelper::getPackage()), PriorityQueue::LOW - 100);

        $package->getContainer()->getParent()->set('current.package', $package);

        $package->app->getRouter();
        $package->app->set('route.extra.layout', 'error');
        $package->app->input->set('exception', $exception);

        $response = (new HtmlResponse)->withStatus(
            ErrorManager::normalizeCode($exception->getCode()),
            ErrorManager::normalizeMessage($exception->getMessage())
        );

        $response = $package->execute('Error\GetController', $package->app->request, $response);

        $package->app->server->getOutput()->respond($response);
    }
}
