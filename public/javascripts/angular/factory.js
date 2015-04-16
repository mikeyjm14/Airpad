AirPadApp.factory('OrigSummernoteConfig', [function () {
	return {
        styleWithSpan: true,
        focus: true,
        airMode: true,
        toolbar: [
            ['edit',['undo','redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link','hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
    };
}]);

AirPadApp.factory('CustSummernoteConfig', [function () {
	return {
        styleWithSpan: true,
        focus: true,
        airMode: false,
        toolbar: [
            ['view', ['codeview']]
        ]
    };
}]);

AirPadApp.factory('Users', [function () {
	return {
		users: [
			{
				id: randomString(15),
				name: 'John Doe',
				username: 'John',
				email: 'john@doe.com',
				password: 'Doe',
				about: 'I am the real John Doe.',
				signupDate: theDate(1),
				amountOfNotes: 0,
				amountFavorited: 0,
				amountDeleted: 0,
				notes: [
					{
						title: "Note 1",
						content: "Content",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						categories: ["none yet", "none added yet", "none to add yet"],
						id: "RandomNess",//randomString(10),
						favored: false
					},
					{
						title: "Note 2",
						content: "<ul><li>Content</li></ul>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 3",
						content: "<ol><li>Content</li></ol>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 4",
						content: "<table class='table table-bordered'><tbody><tr><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td></tr></tbody></table>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 5",
						content: "<pre>Content</pre>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					}
				],
				favs: [],
				deleted: []
			},
			{
				id: randomString(15),
				name: 'Don Joe',
				username: 'Don',
				email: 'don@joe.com',
				password: 'Joe',
				about: 'I am the real Don Joe.',
				signupDate: theDate(1),
				amountOfNotes: 0,
				amountFavorited: 0,
				amountDeleted: 0,
				notes: [
					{
						title: "Note 1",
						content: "Content",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: "RandomNess",//randomString(10),
						favored: false
					},
					{
						title: "Note 2",
						content: "<ul><li>Content</li></ul>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 3",
						content: "<ol><li>Content</li></ol>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 4",
						content: "<table class='table table-bordered'><tbody><tr><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td></tr></tbody></table>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 5",
						content: "<pre>Content</pre>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 1",
						content: "Content",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 2",
						content: "<ul><li>Content</li></ul>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 3",
						content: "<ol><li>Content</li></ol>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 4",
						content: "<table class='table table-bordered'><tbody><tr><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td><td><br></td></tr></tbody></table>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					},
					{
						title: "Note 5",
						content: "<pre>Content</pre>",
						creator: "John Doe",
						creationDate: theDate(1),
						recentEditDate: theDate(0),
						id: randomString(10),
						favored: false
					}
				],
				favs: [],
				deleted: []
			}
		]
	};
}]);