## Getting Started

Once spec-kit is installed, create a project with spec-kit in the required folder using terminal:

```shell
cd required-folder-path
specifiy init < PROJECT_NAME >
```

In this case the PROJECT_NAME="blogsite_project".
Follow the prompts as shown on the screen to set up spec-kit for copilot.

In the terminal, navigate to the project folder and open vs code

```
cd <PROJECT_NAME>
code .
```

This should open VS code in the required project folder.

## Spec-kit based development

1. Create the `constituion.md` file
```
/speckit.constitution Fill the constitution.md with the basic requirements for a static web page application based on the template
```

2. Create the spec
```
/speckit.specify Build a modern bloging website. The UI should slook and modern. It should have one landing page with the latest publisdhed blog; and it should blogs page that has all the blogs, FAQ page and an abouts page. It should have about 10 blogs - mock all the data nothing to pull from real feed
```

3. Create the plan
```
/speckit.plan Use next.js with static site configurations - not databases needed, the mock blob content can be in a data folder in the codebase itself. make sure the UI is responsive and adpatable for mobile screens as well
```

4. Create the tasks
```
/speckit.task break this down into tasks
```

5. Implement the tasks
```
/speckit.implement implement the tasks for this rpoejct and udpate the task list as you go.
```

6. The final artefacts of the specs produced after speckit based development are persisted in the codebase for demonstation purpose in the specs folder [blogsite_project/specs/001-modern-blog-site](blogsite_project/specs/001-modern-blog-site)

Note: Some debugging might be needed post the first draft of development. 

7. Further, you can vibe code with copilot to further polish the development and complete the final stage of development.

## Run the application

Navigate to the project directory and run:

```bash
cd blogsite_project
npm install  # if needed
npm run dev  # for development
npm run build  # for production build
```

For more details, see [blogsite_project/README.md](blogsite_project/README.md)


Note: The demo is 90% viebcoded so my produced artefacts might be different from yours even with the same set of prompts.