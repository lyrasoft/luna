/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

;(function ($) {
    var ContactPreview = {
        fields: [
            'id',
            'subject',
            'name',
            'email',
            'phone',
            'url',
            'created',
            'content'
        ],

        options: {
            lang_prefix: 'luna.'
        },

        handlers: {},

        init: function () {
            this.modal   = $('#preview-modal');
            this.buttons = $('[data-preview-button]');
            this.table   = this.modal.find('#preview-table');
            this.loading = this.modal.find('#preview-loading');
            this.editButton = this.modal.find('#preview-edit-button');

            this.bindEvents();

            var hash = window.location.hash;

            if (hash) {
                var id = hash.replace(/\#contact-/, '');

                this.showContact(id);
            }
        },

        bindEvents: function () {
            var self = this;
            this.buttons.on('click', function (event) {
                event.preventDefault();

                var id = $(this).data('preview-id');

                self.showContact(id);
            });
        },

        showContact: function (id) {
            var self = this;

            if (!id) {
                throw new Error('No preview ID.')
            }

            self.table.empty().hide();
            self.loading.show();

            window.location.hash = 'contact-' + id;

            Phoenix.Ajax.get(Phoenix.Router.route('contact_preview'), {'id': id})
                .done(function (response) {
                        if (response.success) {
                            self.updateTable(response.data.item);
                        } else {
                            console.log(response.message);
                        }
                }).then(function () {
                    self.loading.hide();
                    self.table.fadeIn();
                }).fail(function (error) {
                    console.log(error);
                });

            self.modal.modal('show');

            // Replace edit button URL
            var url = new SimpleURI(Phoenix.Router.route('contact_edit'));
            url.setVar('id', id);
            this.editButton.attr('href', url.toString());
        },

        updateTable: function (item) {
            var self = this;

            this.table.empty();

            $.each(this.fields, function () {
                var key = this.toString();

                if (item[key] !== undefined) {
                    self.addRow(key, item[key]);
                }
            });

            if (Object.keys(item.details).length) {
                var text = Phoenix.Translator.translate(this.options.lang_prefix + 'contact.field.details');
                var tr = $('<tr class="details-separator active"><th style="text-align: center" class="lead" colspan="5">' + text + '</th></tr>');
                this.table.append(tr);
            }

            $.each(item.details, function (e, k) {
                self.addRow(k, this.toString());
            });
        },

        addRow: function (key, value) {
            var tr = $('<tr class="row-' + key + '"></tr>');

            value = this.cast(key, value);

            var lang = this.options.lang_prefix + 'contact.field.' + key;

            tr.append($('<th width="150px"></th>').text(Phoenix.Translator.translate(lang)));
            tr.append($('<td></td>').html(value));

            this.table.append(tr);
        },

        cast: function (key, value) {
            if (value !== '') {
                if (this.handlers[key] !== undefined) {
                    var callback = this.handlers[key];
                    return callback(key, value);
                }

                switch (key) {
                    case 'url':
                        value = '<a target="_blank" href="' + value + '">' + value + '</a>';
                        break;

                    case 'email':
                        value = '<a target="_blank" href="mailto:' + value + '">' + value + '</a>';
                        break;

                    case 'content':
                        value = value.replace(/\n/g, '<br />');
                        break;
                }
            }

            return value;
        },

        addFieldHandler: function (key, callback) {
            this.handlers[key] = callback;

            return this;
        }
    };

    $(function () {
        ContactPreview.init();
    });

    window.ContactPreview = ContactPreview;
})(jQuery);
