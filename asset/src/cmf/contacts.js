/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

(($) => {
  const ContactPreview = {
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

    init() {
      this.modal = $('#preview-modal');
      this.buttons = $('[data-preview-button]');
      this.table = this.modal.find('#preview-table');
      this.loading = this.modal.find('#preview-loading');
      this.editButton = this.modal.find('#preview-edit-button');

      this.bindEvents();

      const hash = window.location.hash;

      if (hash) {
        const id = hash.replace(/\#contact-/, '');

        this.showContact(id);
      }
    },

    bindEvents() {
      const self = this;
      this.buttons.on('click', function(event) {
        event.preventDefault();

        const id = $(this).data('preview-id');

        self.showContact(id);
      });

      this.modal.on('hide.bs.modal', function() {
        window.location.hash = '';
      });
    },

    showContact(id) {
      const self = this;

      if (!id) {
        throw new Error('No preview ID.')
      }

      self.table.empty().hide();
      self.loading.show();

      window.location.hash = 'contact-' + id;

      Phoenix.Ajax.get(Phoenix.Router.route('contact_preview'), {'id': id})
        .done(function(response) {
          if (response.success) {
            self.updateTable(response.data.item);
          } else {
            console.log(response.message);
          }
        }).then(function() {
        self.loading.hide();
        self.table.fadeIn();
      }).fail(function(error) {
        console.log(error);
      });

      self.modal.modal('show');

      // Replace edit button URL
      const url = new SimpleURI(Phoenix.Router.route('contact_edit'));
      url.setVar('id', id);
      this.editButton.attr('href', url.toString());
    },

    updateTable(item) {
      const self = this;

      this.table.empty();

      $.each(this.fields, function() {
        const key = this.toString();

        if (item[key] !== undefined) {
          self.addRow(key, item[key]);
        }
      });

      if (item.details && Object.keys(item.details).length) {
        const text = Phoenix.Translator.translate(this.options.lang_prefix + 'contact.field.details');
        const tr = $('<tr class="details-separator active"><th style="text-align: center" class="lead" colspan="5">' + text + '</th></tr>');
        this.table.append(tr);
      }

      $.each(item.details, function(k, e) {
        self.addRow(k, e ? e.toString() : '');
      });
    },

    addRow(key, value) {
      const tr = $('<tr class="row-' + key + '"></tr>');

      value = this.cast(key, value);

      const lang = this.options.lang_prefix + 'contact.field.' + key;

      tr.append($('<th width="150px"></th>').text(Phoenix.Translator.translate(lang)));
      tr.append($('<td></td>').html(value));

      this.table.append(tr);
    },

    cast(key, value) {
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

    addFieldHandler(key, callback) {
      this.handlers[key] = callback;

      return this;
    }
  };

  $(function() {
    ContactPreview.init();
  });

  window.ContactPreview = ContactPreview;
})(jQuery);
