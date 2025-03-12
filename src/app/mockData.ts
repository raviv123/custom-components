export const dashboard = [
  {
   widgetId:1,
   fixed:true,
   widgetData:[{
    greeting: 'Good morning!',
    reminder: 'You have reminders left for today, please check',
    notifications: [
      {
        message: 'John Doe has been successfully onboarded',
      },
    ],
  }]
  },
  {
    widgetId:2,
    fixed:true,
    widgetData:[{
    message:
      'You onboarded 2 organizations yesterday, add more today by clicking the button.',
   }]
  },

  {
    widgetId:3,
    fixed:true,
    widgetData:[{
    organization_listing: [
      {
        name: 'Tech Innovators',
      },
      {
        name: 'Green Energy Corp',
      },
      {
        name: 'Digital Solutions Inc',
      },
    ],
  }]
  },

  {
    widgetId:4,
    fixed:false,
    widgetData:[{
    total_seekers: 528,
    list: [
      {
        name: 'Alice Johnson',
        organization: 'Tech Innovators',
      },
      {
        name: 'Smith',
        organization: 'Green Energy Corp',
      },
      {
        name: 'Davis',
        organization: 'Digital Solutions Inc',
      },
    ],
  }]
  },
  {
    widgetId:5,
    fixed:false,
    widgetData:[{
    organization_invites: [
      {
        name: 'HealthCarePlus',
      },
      {
        name: 'Motherhood Hospital',
      },
      {
        name: 'City Care',
      },
    ],
  }]
  },
  {
    widgetId:6,
    fixed:false,
    widgetData:[{
    top_trending_assessments: [
      {
        title: 'PHQ-9',
        questions: 16,
      },
      {
        title: 'SPIN',
        questions: 20,
      },
      {
        title: 'PCL-5',
        questions: 15,
      },
    ],
  }]
  },
];
