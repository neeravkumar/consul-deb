//
// A Consul service.
//
App.Service = Ember.Object.extend({
  //
  // The number of failing checks within the service.
  //
  failingChecks: function() {
    // If the service was returned from `/v1/internal/ui/services`
    // then we have a aggregated value which we can just grab
    if (this.get('ChecksCritical') != undefined) {
      return (this.get('ChecksCritical') + this.get('ChecksWarning'))
    // Otherwise, we need to filter the child checks by both failing
    // states
    } else {
    return (checks.filterBy('Status', 'critical').get('length') +
      checks.filterBy('Status', 'warning').get('length'))
    }
  }.property('Checks'),

  //
  // The number of passing checks within the service.
  //
  passingChecks: function() {
    // If the service was returned from `/v1/internal/ui/services`
    // then we have a aggregated value which we can just grab
    if (this.get('ChecksPassing') != undefined) {
      return this.get('ChecksPassing')
    // Otherwise, we need to filter the child checks by both failing
    // states
    } else {
      return this.get('Checks').filterBy('Status', 'passing').get('length');
    }
  }.property('Checks'),

  //
  // The formatted message returned for the user which represents the
  // number of checks failing or passing. Returns `1 passing` or `2 failing`
  //
  checkMessage: function() {
    if (this.get('hasFailingChecks') === false) {
      return this.get('passingChecks') + ' passing';
    } else {
      return this.get('failingChecks') + ' failing';
    }
  }.property('Checks'),

  //
  // Boolean of whether or not there are failing checks in the service.
  // This is used to set color backgrounds and so on.
  //
  hasFailingChecks: function() {
    return (this.get('failingChecks') > 0);
  }.property('Checks')
});

//
// A Consul Node
//
App.Node = Ember.Object.extend({
  //
  // The number of failing checks within the service.
  //
  failingChecks: function() {
    var checks = this.get('Checks');
    // We view both warning and critical as failing
    return (checks.filterBy('Status', 'critical').get('length') +
      checks.filterBy('Status', 'warning').get('length'))
  }.property('Checks'),

  //
  // The number of passing checks within the service.
  //
  passingChecks: function() {
    return this.get('Checks').filterBy('Status', 'passing').get('length');
  }.property('Checks'),

  //
  // The formatted message returned for the user which represents the
  // number of checks failing or passing. Returns `1 passing` or `2 failing`
  //
  checkMessage: function() {
    if (this.get('hasFailingChecks') === false) {
      return this.get('passingChecks') + ' passing';
    } else {
      return this.get('failingChecks') + ' failing';
    }
  }.property('Checks'),

  //
  // Boolean of whether or not there are failing checks in the service.
  // This is used to set color backgrounds and so on.
  //
  hasFailingChecks: function() {
    return (this.get('failingChecks') > 0);
  }.property('Checks')
});


//
// A key/value object
//
App.Key = Ember.Object.extend(Ember.Validations.Mixin, {
  // Validates using the Ember.Valdiations library
  validations: {
    Key: { presence: true }
  },

  // Boolean if the key is valid
  keyValid: Ember.computed.empty('errors.Key'),
  // Boolean if the value is valid
  valueValid: Ember.computed.empty('errors.Value'),

  // The key with the parent removed.
  // This is only for display purposes, and used for
  // showing the key name inside of a nested key.
  keyWithoutParent: function() {
    return (this.get('Key').replace(this.get('parentKey'), ''));
  }.property('Key'),

  // Boolean if the key is a "folder" or not, i.e is a nested key
  // that feels like a folder. Used for UI
  isFolder: function() {
    if (this.get('Key') === undefined) {
      return false;
    };
    return (this.get('Key').slice(-1) === '/')
  }.property('Key'),

  // Determines what route to link to. If it's a folder,
  // it will link to kv.show. Otherwise, kv.edit
  linkToRoute: function() {
    if (this.get('Key').slice(-1) === '/') {
      return 'kv.show'
    } else {
      return 'kv.edit'
    }
  }.property('Key'),

  // The base64 decoded value of the key.
  // if you set on this key, it will update
  // the key.Value
  valueDecoded: function(key, value) {

    // setter
    if (arguments.length > 1) {
      this.set('Value', value);
      return value;
    }

    // getter

    // If the value is null, we don't
    // want to try and base64 decode it, so just return
    if (this.get('Value') === null) {
      return "";
    }

    // base64 decode the value
    return window.atob(this.get('Value'));
  }.property('Value'),


  // An array of the key broken up by the /
  keyParts: function() {
    var key = this.get('Key');

    // If the key is a folder, remove the last
    // slash to split properly
    if (key.slice(-1) == "/") {
      key = key.substring(0, key.length - 1);
    }

    return key.split('/');
  }.property('Key'),

  // The parent Key is the key one level above this.Key
  // key: baz/bar/foobar/
  // grandParent: baz/bar/
  parentKey: function() {
    var parts = this.get('keyParts').toArray();

    // Remove the last item, essentially going up a level
    // in hiearchy
    parts.pop();

    return parts.join("/") + "/";
  }.property('Key'),

  // The grandParent Key is the key two levels above this.Key
  // key: baz/bar/foobar/
  // grandParent: baz/
  grandParentKey: function() {
    var parts = this.get('keyParts').toArray();

    // Remove the last two items, jumping two levels back
    parts.pop();
    parts.pop();

    return parts.join("/") + "/";
  }.property('Key')
});
