<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Data;

use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Data\ValueObject;

/**
 * The MetaData class.
 */
class MetaData extends ValueObject
{
    public string $title = '';

    public string $description = '';

    public string $keywords = '';

    public string $cover = '';

    public string $customCode = '';

    public string $ogDescription = '';

    public string $ogImage = '';

    public string $ogTitle = '';

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param  string  $title
     *
     * @return  static  Return self to support chaining.
     */
    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param  string  $description
     *
     * @return  static  Return self to support chaining.
     */
    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return string
     */
    public function getKeywords(): string
    {
        return $this->keywords;
    }

    /**
     * @param  string  $keywords
     *
     * @return  static  Return self to support chaining.
     */
    public function setKeywords(string $keywords): static
    {
        $this->keywords = $keywords;

        return $this;
    }

    /**
     * @return string
     */
    public function getCover(): string
    {
        return $this->cover;
    }

    /**
     * @param  string  $cover
     *
     * @return  static  Return self to support chaining.
     */
    public function setCover(string $cover): static
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * @return string
     */
    public function getCustomCode(): string
    {
        return $this->customCode;
    }

    /**
     * @param  string  $customCode
     *
     * @return  static  Return self to support chaining.
     */
    public function setCustomCode(string $customCode): static
    {
        $this->customCode = $customCode;

        return $this;
    }

    /**
     * @return string
     */
    public function getOgDescription(): string
    {
        return $this->ogDescription;
    }

    /**
     * @param  string  $ogDescription
     *
     * @return  static  Return self to support chaining.
     */
    public function setOgDescription(string $ogDescription): static
    {
        $this->ogDescription = $ogDescription;

        return $this;
    }

    /**
     * @return string
     */
    public function getOgImage(): string
    {
        return $this->ogImage;
    }

    /**
     * @param  string  $ogImage
     *
     * @return  static  Return self to support chaining.
     */
    public function setOgImage(string $ogImage): static
    {
        $this->ogImage = $ogImage;

        return $this;
    }

    /**
     * @return string
     */
    public function getOgTitle(): string
    {
        return $this->ogTitle;
    }

    /**
     * @param  string  $ogTitle
     *
     * @return  static  Return self to support chaining.
     */
    public function setOgTitle(string $ogTitle): static
    {
        $this->ogTitle = $ogTitle;

        return $this;
    }

    public function processHtmlFrame(
        HtmlFrame $htmlFrame,
        ?string $defaultTitle = null,
        ?int $descriptionTruncate = 150,
    ): void {
        if ($this->getTitle()) {
            $htmlFrame->setTitle($this->getTitle() ?: $defaultTitle);
        }

        if ($this->getOgTitle()) {
            $htmlFrame->addOpenGraph('og:title', $this->getOgTitle(), true);
        }

        $htmlFrame->setDescriptionIfNotEmpty($this->getDescription(), $descriptionTruncate);

        if ($this->getOgDescription()) {
            $htmlFrame->addOpenGraph('og:description', $this->getOgDescription(), true);
        }

        $htmlFrame->setCoverImagesIfNotEmpty(
            $this->getCover() ?: $this->getOgImage()
        );
    }
}
