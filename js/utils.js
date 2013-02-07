var Application = function () {

    this.initialize = function () {

        this.models = {};
        this.views = {};
        this.templateLoader = new this.TemplateLoader();

    };

    this.TemplateLoader = function () {

        this.templates = {};

        this.load = function (names, callback) {

            var deferreds = [],
                self = this;

            $.each(names, function (index, name) {
                deferreds.push($.get('tpl/' + name + '.html', function (data) {
                    self.templates[name] = data;
                }));
            });

            $.when.apply(null, deferreds).done(callback);
        };

        // Get template by name from hash of preloaded templates
        this.get = function (name) {
            return this.templates[name];
        };

    };

    this.initialize();

}

