{{-- Part of earth project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Config\ConfigHtmlView    View object.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\ConfigRecord
 * @var $state    \Windwalker\Structure\Structure
 * @var $form     \Windwalker\Form\Form
 */
?>

<div class="row config-core-page">
    <div class="col-lg-7">
        <div class="fieldset-basic card mb-4">
            <div class="card-body">
                {!! $form->renderFields('basic') !!}
            </div>
        </div>
    </div>

    <div class="col-lg-5">
        @if (count($form->getFields('advanced')))
            <div class="fieldset-advanced card mb-4">
                <div class="card-body">
                    {!! $form->renderFields('advanced') !!}
                </div>
            </div>
        @endif
    </div>
</div>
