define({ "api": [
  {
    "type": "post",
    "url": "/job/acceptbid",
    "title": "Accept Job Bidding",
    "name": "AcceptJobBidding",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "bid_id",
            "description": "<p>Mandatory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/job/cancelbid",
    "title": "Cancel Job Bidding",
    "name": "CancelJobBidding",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "bid_id",
            "description": "<p>Mandatory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/job/create",
    "title": "Create Job",
    "version": "0.2.0",
    "name": "CreateJob",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "client_id",
            "description": "<p>Mandatory</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "header",
            "description": "<p>Mandatory</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Mandatory</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": true,
            "field": "duedate",
            "description": "<p>Optional</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "price",
            "description": "<p>Mandatory</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer[]",
            "optional": true,
            "field": "categories",
            "description": "<p>Optional</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "duration",
            "description": "<p>Mandatory duration of the job in days</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "bidding",
            "description": "<p>status] Optional if user doesn't want any bids, send it as 'closed', otherwise 'open'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/job/createbid",
    "title": "Create Job Bidding",
    "name": "CreateJobBidding",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "job_id",
            "description": "<p>Mandatory</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "amount",
            "description": "<p>Mandatory amount of money that freelancer bid on the jobs</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Optional description from freelancer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/job/createupdate",
    "title": "Create Update -> If freelancer wants to create a milestone or completion,",
    "name": "CreateUpdate",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "job_id",
            "description": "<p>Mandatory</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>&quot;milestone&quot; or &quot;completion&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/job/getalljobs",
    "title": "Get All Jobs",
    "version": "0.2.0",
    "name": "GetAllJobs",
    "group": "Job",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jobs",
            "description": "<p>List of jobs found, as objects.</p>"
          }
        ]
      }
    },
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/job/getselfjobs",
    "title": "Get Self Jobs",
    "version": "0.2.0",
    "name": "GetSelfJobs",
    "group": "Job",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jobs",
            "description": "<p>List of jobs found, as objects.</p>"
          }
        ]
      }
    },
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/job/getuserjobs/:userId",
    "title": "Get User's Jobs",
    "version": "0.2.0",
    "name": "GetUserJobs",
    "group": "Job",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "jobs",
            "description": "<p>List of jobs found, as objects.</p>"
          }
        ]
      }
    },
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/job/rejectbid",
    "title": "Reject Job Bidding",
    "name": "RejectJobBidding",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "bid_id",
            "description": "<p>Mandatory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/job/requestupdate",
    "title": "Request Update -> If client wants an update on the job, use this request",
    "name": "RequestUpdate",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "job_id",
            "description": "<p>Mandatory</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/job/updatebid",
    "title": "Update Job Bidding",
    "name": "UpdateJobBidding",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "bid_id",
            "description": "<p>Mandatory</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "new_amount",
            "description": "<p>Mandatory amount of money that freelancer bid on the job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_description",
            "description": "<p>Optional new description of the bid</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/job/details/:job_id",
    "title": "Job Details",
    "version": "0.2.0",
    "name": "jobDetails",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "job_id",
            "description": "<p>Wanted job's id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "job",
            "description": "<p>Found job as JSON object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "job_anno",
            "description": "<p>job's annotations as JSON object</p>"
          }
        ]
      }
    },
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/job/details/:job_id",
    "title": "Job Details",
    "version": "0.2.0",
    "name": "jobDetails",
    "group": "Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "job_id",
            "description": "<p>Wanted job's id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "job",
            "description": "<p>Found job as JSON object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "job_anno",
            "description": "<p>job's annotations as JSON object</p>"
          }
        ]
      }
    },
    "filename": "controllers/job_controller.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/message/sendnotification/",
    "title": "Send Notification to Other User",
    "version": "0.2.0",
    "name": "sendNotification",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "job_id",
            "description": "<p>The id of the job that the notification is about.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Message to send. Only used if the message type is &quot;custom&quot;.</p>"
          },
          {
            "group": "Parameter",
            "type": "Enum",
            "optional": false,
            "field": "message_type",
            "description": "<p>The type of the message. Can currently be either &quot;status&quot; or &quot;custom&quot;.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success message.</p>"
          }
        ]
      }
    },
    "filename": "controllers/notification_controller.js",
    "groupTitle": "Notification"
  }
] });
