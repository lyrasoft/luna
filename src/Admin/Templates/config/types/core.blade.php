{{-- Part of earth project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Legacy\Web\Application                 Global Application
 * @var $package  \Lyrasoft\Luna\LunaPackage                 Package object.
 * @var $view     \Lyrasoft\Luna\Admin\View\Config\ConfigHtmlView    View object.
 * @var $uri      \Windwalker\Legacy\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Legacy\Core\DateTime\DateTime          PHP DateTime object of current time.
 * @var $helper   \Windwalker\Legacy\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Legacy\Core\Router\MainRouter          Route builder object.
 * @var $asset    \Windwalker\Legacy\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \Lyrasoft\Luna\Admin\Record\ConfigRecord
 * @var $state    \Windwalker\Legacy\Structure\Structure
 * @var $form     \Windwalker\Legacy\Form\Form
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
