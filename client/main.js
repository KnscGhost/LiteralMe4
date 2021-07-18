import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor
import './main.html';
import '../lib/collection.js';

Template.mainBody.helpers({
	allBooks(){
		return booksdb.find();
	},
});

/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/

Template.myJumbo.events({
	'click .js-save' (event, instance){
		var bookName = $('#Title').val();
		var bookLink = $('#bookURL').val();
		var Des = $('#Description').val();
		var Author = $('#Author').val();
		booksdb.insert({
			"Title" : bookName,
			"bookURL" : bookLink,
			"Description": Des,
			"Author": Author
		});
		console.log ("saving..." + "Title:" + bookName + "URL:"+ bookLink + "Description:"+ Des);
				$("#addImageModal").modal("hide");
				$("#Title").val("");
				$("#bookURL").val("");
				$("#Description").val("");

	},
	'input #bookURL'(event, instance){
			$("fur").attr ("src", $ ("#bookURL") .val());
			console.log($("#bookURL").val());
		}

});

Template.mainBody.events({
	'click .js-veiwBook'(event, instance){
		console.log(this._id);
		$("#veiwBookModal").modal("show");
		var myId = this._id;
		var theTitle = booksdb.findOne({_id:myId}).Title;
		var thePath = booksdb.findOne({_id:myId}).bookURL;
		var theDes = booksdb.findOne({_id:myId}).Description;
		var theAuthor = booksdb.findOne({_id:myId}).Author;
		$("#veiwId").val(myId);
		$("#veiwTitle").html(theTitle);
		$("#veiwDescription").html(theDes);
		$("#veiwAuthor").html(theAuthor);
		$(".veiwHolder").attr("src", thePath);

		
		// instance.veiw.set(instance).set(instance.veiw.get(myId) + 1);
	},

    'click .js-editMe'(event, instance){
    	$("#editBookModal").modal("show");
       var myId = this._id;
		var theTitle = booksdb.findOne({_id:myId}).Title;
		var thePath = booksdb.findOne({_id:myId}).bookURL;
		var theDes = booksdb.findOne({_id:myId}).Description;
		var theAuthor = booksdb.findOne({_id:myId}).Author;
		$("#editId").val(myId);
		$("#editbookTitle").val(theTitle);
		$("#editbookDescription").val(theDes);
		$("#editbookAuthor").val(theAuthor);
		$(".editHolder").attr("src", thePath);
    },
    'click .js-closeMe'(event, instance){
        $("#editBookModal").modal("hide");
        $('#editbookTitle').val('');
        $('#editbookURL').val('');
        $('#editbookAuthor').val('')
        $('#editbookDescription').val('');
        $(".editHolder").attr("src",$("#editbookPath").val());
    },
    'input #editbookPath'(event, instance){
            $(".editHolder").attr("src",$("#editbookPath").val());
        },
        'click .js-delete'(event, instance){
		var myId =this._id;
	$("#"+this._id).fadeOut('slow', function(){
		booksdb.remove({_id:myId});
		console.log(myId);
	})
},


	});


Template.editBook.events({
	'click .js-saveeditMe'(event, instance){
		 var newTitle = $("#editbookTitle").val();
        var newbookURL = $("#editbookURL").val();
         var newAuthor = $("#editbookAuthor").val();
         var newDes = $("#editbookDescription").val();
        var updateId = $('#editId').val();
         console.log(updateId);
        booksdb.update({_id: updateId},
                {$set:{
                    "Title": newTitle,
                    "bookURL": newbookURL,
                    "Description": newDes,
                    "Author": newAuthor
                }}
            );
        
				console.log ("saving...");
				$("#js-addImageModal").modal("hide");
				$("#editbookTitle").val("");
				$("#editbookURL").val("");
				$("#editbookDescription").val("");
				$("#editbook").val("");
        $("#editBookModal").modal("hide");
	},
	'input #editbookURL'(event, instance){
			$(".editHolder").attr ("src", $("#editbookURL").val());
			console.log($("#editbookURL").val());
		}
});