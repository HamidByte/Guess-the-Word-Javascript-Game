define(["jquery", "fetch"], function($, dataset) {
  return {
    // check for  errors in dataset's ids e.g. if same id is repeating or missing id.
    testIds: function() {
      let ids = dataset.map((item) => {
        return item.id
      })

      for (var i = 0; i < dataset.length; i++) {
        if(i !== ids[i]) {
          console.log("Something went wrong in dataset ID #: ", i)
        }
      }
    },
  }
})