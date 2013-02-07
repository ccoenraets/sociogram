fb.models.Person = Backbone.Model.extend({
    defaults: {
        "id":  "",
        "name":     "",
        "first_name":    "",
        "last_name":    "",
        "gender":    "",
        "username":    "",
        "link":    "",
        "locale":    "",
        "timezone":    ""
    }
});

fb.models.PersonCollection = Backbone.Collection.extend({

    model: fb.models.Person

});