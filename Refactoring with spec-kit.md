## Getting Started

Once spec-kit is installed, navigate to the project folder using terminal and initialise it with spec-kit:

```shell
cd required-folder-path
specifiy init .
```

In this case the PROJECT_NAME="blogsite_project_feature_1".

Note: For the scope of development I removed preexisting constituion.md and spec folders from the `blogsite_project` and copied the content into a seaprate folder and renamed it  to "required-folder-path" to demonstrate the use of spec-kit based development on existing codebases.

Follow the prompts and instructions as shown on the screen to set up spec-kit for copilot.

In the terminal, navigate to the project folder and open vs code

```
code .
```

This should open VS code in the required project folder.



## Spec-kit based refactoring and feature development

Aim: my blogging website doesn't have an upload functionality. I want there to be a way where I can write and upload blogs on the website iteself. This entire vibe codoing exercise is geared towards using spec-kit based development to refactor an older codebase; and integrate a new feature to a legacy application.

1. Create the `constituion.md` file
```
/speckit.constitution This is a static website, built using next js. There is no database, it is all mock data present in the src/data folder
```

2. Create the spec
```
/speckit.specify I want to build an uploads page where the user can upload blogs - sort of filling in the required values(whatever is requried and needs user entered details like title, author, excerpt, image(optional if not resets to the default one), content, tags, readingtime) for posts. 

Example:
{
      "id": "1",
      "slug": "getting-started-with-nextjs-14",
      "title": "Getting Started with Next.js 14: A Complete Guide",
      "author": "Jane Doe",
      "publishedDate": "2025-01-15T00:00:00.000Z",
      "excerpt": "Learn how to build modern web applications with Next.js 14, the latest version of the popular React framework. This comprehensive guide covers everything from setup to deployment.",
      "featuredImage": "/images/blog/nextjs-14.jpg",
      "featuredImageAlt": "Next.js 14 logo and code editor",
      "content": "getting-started-with-nextjs-14.md",
      "tags": ["Next.js", "React", "Web Development", "Tutorial"],
      "readingTimeMinutes": 8
    }

User should be able to fill in the same values from the UI on the upload page - some default values might already be there as is. Again no database, the uploaded content can be added to the blogs.json ..
```

3. Check for any clarifications needed
```
/speckit.clarify Any clarifying queries you need clarification around the feature before proceeding for further steps?
```

Answer the clartifying questions to keep the feature specs minimal and light weight for first cut development

4. Create the plan
```
/speckit.plan Refer the README.md for technical specs already there, build a new page and required endpoint for upload. Store the data in data folder only. Follow the same design patterns and styling patterns as available.
```

5. Create the tasks
```
/speckit.task
```

Nudge copilot to create the task list based on the plan.


6. Implement the tasks
```
/speckit.implement
```

Intiatite the implementation of the planned tasks via copilot.


7. The final artefacts of the specs produced after speckit based development are persisted in the codebase for demonstation purpose in the specs folder [blogsite_project_feature_1\specs\002-blog-uploads]( blogsite_project_feature_1/specs/002-blog-uploads)

8. Further, you can vibe code with copilot to further polish the development and complete or refine the final stages of development.

## Run the application

Navigate to the project directory and run:

```bash
cd blogsite_project_feature_1
npm install  # if needed
npm run dev  # for development
npm run build  # for production build
```

For more details, see [blogsite_project_feature_1/README.md](blogsite_project_feature_1\README.md)


Note: The demo is 90% viebcoded so my produced artefacts might be different from yours even with the same set of prompts.
