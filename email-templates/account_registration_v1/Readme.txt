New Account Template Package.
=============================

The following fields can be referenced in the templates.
--------------------------------------------------------
  data.sitename (string)
  data.storefrontUrl (string)
  data.firstName (string)
  data.lastName (string)
  data.email (string)
  data.receiveEmail (string)
  data.resetPasswordLink (string)
  data.id (string)
  data.locale (string)
  data.recommendations (array) ->
    items (object) ->
      title (string)
      description (string)
      longDescription (string)
      brand (string)
      location (string)
      imageLocation (string)
      listPrice (string)
      onSale (string)
      salePrice (string)
      priceRange (string)
      priceMax (string)
      priceMin (string)
