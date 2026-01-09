# Building with github spec-kit

This repository aims at helping you and guiding you on how to build a sample blog site applications with spec-kit based development framework. 
Please note: There is not need to clone the repo, but the repo serves as a static output artefact of github spec-kit based development. You can follow the steps in each of the exercises to demonstrate spec-kit based development for your customer presentations

The project code was created via spec-kit based development. The final code produced using github copilot along with spec-kit has been moved into the `blogsite_project/` folder and `blogsite_project_feature_1/` folder.


## Prerequisites

Before you start, ensure you have installed spec-kit via terminal:

```shell
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```


## Demo Structure

| Exercise | Duration | Focus Area | Output Codebase | Video
|----------|----------|------------|--------------------|-------|
| [Exercise 1: Building an application from scratch using spec-kit](Building%20with%20spec-kit.md) | 50 mins | Spec-kit based development for net new application development | [blogsite_project](blogsite_project) | [Video](https://microsoftapc-my.sharepoint.com/:v:/g/personal/abpatra_microsoft_com/IQCfqKmUagGURZevK_oweIbKAQ_73INXMBAZtm2YOyfSmZk?e=h62n9l)
| [Exercise 2: Refactoring existing applications using spec-kit](Refactoring%20with%20spec-kit.md) | 35 mins |How to leverage spec-kit to update pre-existing codebases | [blogsite_project_feature_1](blogsite_project_feature_1) | [Video](https://microsoftapc-my.sharepoint.com/:v:/g/personal/abpatra_microsoft_com/IQCjpYttjUJST6Ejc41CpeLQARBan5AF10iVq7TDRIleWgg?e=y6ltfA)

Note: The duration indicated is the original duration of the demos during live demonstration, you can always play the video in 2X for quick smaller demonstrations.



## Demo video of the entire application build journey using spec-kit

### (a) Exercise 1: Building amm application from scrath using spec-kit

[Here](https://microsoftapc-my.sharepoint.com/:v:/g/personal/abpatra_microsoft_com/IQCfqKmUagGURZevK_oweIbKAQ_73INXMBAZtm2YOyfSmZk?e=h62n9l) is the demo video catpruing teh entire experience of using spec-kit for application development from scratch. This is complete recording of how to go about Exercise 1.

1. The demo is a long 50 mins demo since the entire build process takes time
2. The demo has instances that show how github copilot autocorrects and fixes its own issues during development and sticks to plan and core design patterns
3. It also shows how with spec-kit based development once we reach 80% perfection we can nudge and vibecode with copilot to provide the finishing touches to get a well designed fully fleshed out application(
4. The video has a voice over explaining the various parts of development and highlighting the above mentioned aspects. You can always choose to mute and play ti with your own voice over

### (b) Exercise 2: Refactoring large application using spec-kit

[Here](https://microsoftapc-my.sharepoint.com/:v:/g/personal/abpatra_microsoft_com/IQCjpYttjUJST6Ejc41CpeLQARBan5AF10iVq7TDRIleWgg?e=y6ltfA) is the demo video demonstrating the use of github spec-kit to work with an existing application codebase and add a new feature

1. The demo is roughly a 30 mins long demo video catpruign the entire process of refactoring hte blgosite application to add an uploads page and functionality to the web app
2. For the scope of demonstration the same artefact produced out of exercise 1 was used (removing pre-existing speckit files); and the show how spec-kti can be used to refactor net new projects
3. The demo captures certains aspects about how spec-kit grounds its plans and instructions on the existing codebase and further ensures consistency with existing design patterns
4. This video also a has a voice voer explaining various techniques to ground the development process and fix bugs during hte vibecoding exercise

## Run the blogsite artefact from the build exercice

Navigate to the project directory and run:

```bash
cd blogsite_project
npm install  # if needed
npm run dev  # for development
npm run build  # for production build
```

For more details, see [blogsite_project/README.md](blogsite_project/README.md)


## Run the updated blogsite artefact from the refactor exercice

```bash
cd blogsite_project_feature_1
npm install  # if needed
npm run dev  # for development
npm run build  # for production build
```

For more details, see [blogsite_project_feature_1/README.md](blogsite_project_feature_1/README.md)

