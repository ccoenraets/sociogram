fb.views.Shell = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('shell'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        new fb.views.Login({model: this.model, el: '#login'});
        return this;
    },

    events: {
        'mousedown li': 'mouseDown',
        'mouseup li': 'mouseUp',
        'click .btn-login': 'login'
    },

    mouseDown: function (e) {
        $(e.currentTarget).addClass('active');
    },

    mouseUp: function () {
        $('li').removeClass('active');
    },

    login: function () {
        $(document).trigger('login');
        return false;
    }

});

fb.views.Welcome = Backbone.View.extend({

    initialize: function () {
        var self = this;
        this.template = _.template(fb.templateLoader.get('welcome'));
        this.model.on("change", this.showHideButtons, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        this.showHideButtons();
        return this;
    },

    showHideButtons: function () {
        if (this.model.get('id') !== '') {
            $('.btn-login', this.el).addClass('hidden');
            $('.btn-profile', this.el).removeClass('hidden');
        } else {
            $('.btn-login', this.el).removeClass('hidden');
            $('.btn-profile', this.el).addClass('hidden');
        }
    }

});

fb.views.Login = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('login'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .login': 'login',
        'click .logout': 'logout'
    },

    login: function (e) {
        $(document).trigger('login');
        return false;
    },

    logout: function (e) {
        $(document).trigger('logout');
        return false;
    }

});

fb.views.Person = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('person'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

fb.views.Error = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('error'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click .retry':'retry'
    },

    retry: function () {
        Backbone.history.loadUrl(Backbone.history.fragment);
    }

});

fb.views.Friends = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('friends'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .next': 'next',
        'click .previous': 'previous'
    },

    next: function () {
        this.fetch(this.model.get('paging').next);
        return false;
    },

    previous: function () {
        this.fetch(this.model.get('paging').previous);
        return false;
    },

    fetch: function (url) {
        var self = this;
        $.ajax({url:url, dataType:"json"}).done(function (response) {
            self.model.set(response);
        }).fail(function (e) {
                alert('Error fetching data');
            });
    }

});

fb.views.Feed = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('feed'));
        this.model.on("change", this.render, this);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .next': 'next',
        'click .previous': 'previous'
    },

    next: function () {
        this.fetch(this.model.get('paging').next);
        return false;
    },

    previous: function () {
        this.fetch(this.model.get('paging').previous);
        return false;
    },

    fetch: function (url) {
        var self = this;
        $.ajax({url:url, dataType:"json"}).done(function (response) {
            self.model.set(response);
        }).fail(function (e) {
                alert('Error fetching data');
            });
    }

});

fb.views.Post = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('post'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        "click .post": "postMessage"
    },

    postMessage: function () {
        var status = {
                name:$('.itemName').val(),
                link:$('.link').val(),
                picture:$('.picture').val(),
                caption:$('.caption').val(),
                description:$('.description').val()
            };
        FB.api('/me/feed', 'post', status, function(response) {
            if (response && response.id) {
                alert('Your post was published.');
            } else {
                alert('Your post was not published.');
            }
        });
        return false;
    }

});

fb.views.PostUI = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('postui'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        "click .post": "postMessage"
    },

    postMessage: function () {
        FB.ui(
            {
                method:'feed',
                name:'Sociogram Application',
                link:'http://coenraets.org/blog/sociogram',
                picture:'http://coenraets.org/sociogram/img/sociogram.jpg',
                caption:'by Christophe Coenraets',
                description:'Sociogram is a simple application that shows how to use the Facebook JavaScript SDK and the Graph API.'
            },
            function (response) {
                if (response && response.id) {
                    alert('Your post was published.');
                } else {
                    alert('Your post was not published.');
                }
            }
        );
        return false;
    }

});

fb.views.Revoke = Backbone.View.extend({

    initialize: function () {
        this.template = _.template(fb.templateLoader.get('revoke'));
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        "click .revoke": "revoke"
    },

    revoke: function () {
        FB.api("/me/permissions", "delete", function () {
            alert('Permissions revoked');
            FB.getLoginStatus();
        });
        return false;
    }

});