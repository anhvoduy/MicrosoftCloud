# Using Azure Communication Services to Call into a Teams Meeting

To run the React client, follow the steps in the `acs-to-teams-meeting/readme.md` file.
azure function: https://acs-func-app-1001.azurewebsites.net/

### build docker image
$AZURE_FUNCTIONS_DOMAIN="https://acs-func-app-1001.azurewebsites.net/"

- build image:
az acr build --registry $ACR_NAME --image acs-to-teams-meeting `
  --build-arg REACT_APP_ACS_USER_FUNCTION=+$AZURE_FUNCTIONS_DOMAIN+/api/ACSTokenFunction `
  --build-arg REACT_APP_TEAMS_MEETING_FUNCTION=+$AZURE_FUNCTIONS_DOMAIN+/api/TeamsMeetingFunction .

- list image:
az acr repository list --name $ACR_NAME --output table

- logs:
Packing source code into tar to upload...
Excluding '.gitignore' based on default ignore rules
Uploading archived source code from 'C:\Users\voduyanh\AppData\Local\Temp\build_archive_f02a7023b432496f82a44c4f0c10866b.tar.gz'...
Sending context (327.978 KiB) to registry: acaanhvocap...
Queued a build with ID: cm1
Waiting for an agent...
2023/06/21 10:38:05 Downloading source code...
2023/06/21 10:38:06 Finished downloading source code
2023/06/21 10:38:06 Using acb_vol_9cb47877-0995-46bc-a8f4-f16a6c99bb7f as the home volume
2023/06/21 10:38:06 Setting up Docker configuration...
2023/06/21 10:38:07 Successfully set up Docker configuration
2023/06/21 10:38:07 Logging in to registry: acaanhvocap.azurecr.io
2023/06/21 10:38:07 Successfully logged into acaanhvocap.azurecr.io
2023/06/21 10:38:07 Executing step ID: build. Timeout(sec): 28800, Working directory: '', Network: ''
2023/06/21 10:38:07 Scanning for dependencies...
2023/06/21 10:38:08 Successfully scanned dependencies
2023/06/21 10:38:08 Launching container with name: build
Sending build context to Docker daemon  1.277MB
Step 1/16 : FROM node:lts as build
lts: Pulling from library/node
bba7bb10d5ba: Pulling fs layer
ec2b820b8e87: Pulling fs layer
284f2345db05: Pulling fs layer
fea23129f080: Pulling fs layer
9063cd8e3106: Pulling fs layer
e6fac8ec5874: Pulling fs layer
689a3a390764: Pulling fs layer
c976cd216445: Pulling fs layer
fea23129f080: Waiting
9063cd8e3106: Waiting
e6fac8ec5874: Waiting
689a3a390764: Waiting
c976cd216445: Waiting
ec2b820b8e87: Verifying Checksum
ec2b820b8e87: Download complete
bba7bb10d5ba: Verifying Checksum
bba7bb10d5ba: Download complete
284f2345db05: Verifying Checksum
284f2345db05: Download complete
9063cd8e3106: Verifying Checksum
9063cd8e3106: Download complete
e6fac8ec5874: Verifying Checksum
e6fac8ec5874: Download complete
689a3a390764: Verifying Checksum
689a3a390764: Download complete
c976cd216445: Verifying Checksum
c976cd216445: Download complete
fea23129f080: Verifying Checksum
fea23129f080: Download complete
bba7bb10d5ba: Pull complete
ec2b820b8e87: Pull complete
284f2345db05: Pull complete
fea23129f080: Pull complete
9063cd8e3106: Pull complete
e6fac8ec5874: Pull complete
689a3a390764: Pull complete
c976cd216445: Pull complete
Digest: sha256:4a55308cc855cba1a925d19ae4e45838741dad2fd7bb8949a93b2a0f2ae339e3
Status: Downloaded newer image for node:lts
 ---> 8e81ac769c95
Step 2/16 : LABEL author="Microsoft Cloud Advocates"
 ---> Running in 851fee9eca6e
Removing intermediate container 851fee9eca6e
 ---> 430080f70469
Step 3/16 : ARG REACT_APP_ACS_USER_FUNCTION
 ---> Running in fa6f46db405b
Removing intermediate container fa6f46db405b
 ---> 8cd0dfbf6255
Step 4/16 : ARG REACT_APP_ACS_MEETING_FUNCTION
 ---> Running in 38dccc73b6be
Removing intermediate container 38dccc73b6be
 ---> e8622e29201b
Step 5/16 : ENV REACT_APP_ACS_USER_FUNCTION=$REACT_APP_ACS_USER_FUNCTION
 ---> Running in 77370cb3c7f0
Removing intermediate container 77370cb3c7f0
 ---> fe375fdb4748
Step 6/16 : ENV REACT_APP_ACS_MEETING_FUNCTION=$REACT_APP_ACS_MEETING_FUNCTION
 ---> Running in 105b66e7bc24
Removing intermediate container 105b66e7bc24
 ---> 7b2a9f076f18
Step 7/16 : WORKDIR /app
 ---> Running in 86cbf6ef211a
Removing intermediate container 86cbf6ef211a
 ---> 77603f25b37b
Step 8/16 : COPY package.json /app/package.json
 ---> 5ce58eb8dbd2
Step 9/16 : COPY package-lock.json /app/package-lock.json
 ---> de7b0d2cf693
Step 10/16 : RUN npm ci
 ---> Running in 7dd8d5eb6146
npm WARN deprecated stable@0.1.8: Modern JS already guarantees Array#sort() is a stable sort, so this library is deprecated. See the compatibility table on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility
npm WARN deprecated svgo@1.3.2: This SVGO version is no longer supported. Upgrade to v2.x.x.
npm WARN deprecated popper.js@1.16.1: You can find the new Popper v2 at @popperjs/core, this package is dedicated to the legacy v1
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.


added 1437 packages, and audited 1438 packages in 42s

219 packages are looking for funding
  run `npm fund` for details

9 vulnerabilities (2 moderate, 7 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
npm notice
npm notice New minor version of npm available! 9.5.1 -> 9.7.1
npm notice Changelog: <https://github.com/npm/cli/releases/tag/v9.7.1>
npm notice Run `npm install -g npm@9.7.1` to update!
npm notice

Removing intermediate container 7dd8d5eb6146
 ---> 22a99341999d
Step 11/16 : COPY . .
 ---> 7b2900e45fc7
Step 12/16 : RUN npm run build
 ---> Running in 4cca23985b78

> acs-video-to-teams-meeting@0.2.0 build
> cross-env GENERATE_SOURCEMAP=false react-scripts build

Creating an optimized production build...
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme

Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
Compiled successfully.

File sizes after gzip:

  1.03 MB  build/static/js/main.308d93ba.js
  238 B    build/static/css/main.b126878c.css

The bundle size is significantly larger than recommended.
Consider reducing it with code splitting: https://goo.gl/9VhYWB
You can also analyze the project dependencies: https://goo.gl/LeUzfb

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment

Removing intermediate container 4cca23985b78
 ---> e3646fb4f217
Step 13/16 : FROM nginx:alpine
alpine: Pulling from library/nginx
4db1b89c0bd1: Pulling fs layer
bd338968799f: Pulling fs layer
6a107772494d: Pulling fs layer
9f05b0cc5f6e: Pulling fs layer
4c5efdb87c4a: Pulling fs layer
c8794a7158bf: Pulling fs layer
8de2a93581dc: Pulling fs layer
768e67c521a9: Pulling fs layer
9f05b0cc5f6e: Waiting
c8794a7158bf: Waiting
8de2a93581dc: Waiting
768e67c521a9: Waiting
4c5efdb87c4a: Waiting
6a107772494d: Verifying Checksum
6a107772494d: Download complete
4db1b89c0bd1: Verifying Checksum
4db1b89c0bd1: Download complete
bd338968799f: Verifying Checksum
bd338968799f: Download complete
4db1b89c0bd1: Pull complete
bd338968799f: Pull complete
6a107772494d: Pull complete
9f05b0cc5f6e: Verifying Checksum
c8794a7158bf: Verifying Checksum
c8794a7158bf: Download complete
4c5efdb87c4a: Verifying Checksum
4c5efdb87c4a: Download complete
9f05b0cc5f6e: Pull complete
4c5efdb87c4a: Pull complete
c8794a7158bf: Pull complete
8de2a93581dc: Verifying Checksum
8de2a93581dc: Download complete
768e67c521a9: Verifying Checksum
768e67c521a9: Download complete
8de2a93581dc: Pull complete
768e67c521a9: Pull complete
Digest: sha256:2d194184b067db3598771b4cf326cfe6ad5051937ba1132b8b7d4b0184e0d0a6
Status: Downloaded newer image for nginx:alpine
 ---> 4937520ae206
Step 14/16 : VOLUME /var/cache/nginx
 ---> Running in 3ce072df48c6
Removing intermediate container 3ce072df48c6
 ---> 423b163c0185
Step 15/16 : COPY --from=build /app/build /usr/share/nginx/html
 ---> d8149ae9a47a
Step 16/16 : COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
 ---> 55295a479f93
[Warning] One or more build-args [REACT_APP_TEAMS_MEETING_FUNCTION] were not consumed
Successfully built 55295a479f93
Successfully tagged acaanhvocap.azurecr.io/acs-to-teams-meeting:latest
2023/06/21 10:42:35 Successfully executed container: build
2023/06/21 10:42:35 Executing step ID: push. Timeout(sec): 3600, Working directory: '', Network: ''
2023/06/21 10:42:35 Pushing image: acaanhvocap.azurecr.io/acs-to-teams-meeting:latest, attempt 1
The push refers to repository [acaanhvocap.azurecr.io/acs-to-teams-meeting]
410fabba84fa: Preparing
02d219dccc67: Preparing
bdea7c663e86: Preparing
1b22827e15b4: Preparing
d9f50eaf56fa: Preparing
2530717ff0bb: Preparing
e7766bc830a8: Preparing
cb411529b86f: Preparing
bc09720137db: Preparing
3dab9f8bf2d2: Preparing
2530717ff0bb: Waiting
e7766bc830a8: Waiting
cb411529b86f: Waiting
bc09720137db: Waiting
3dab9f8bf2d2: Waiting
d9f50eaf56fa: Pushed
410fabba84fa: Pushed
1b22827e15b4: Pushed
02d219dccc67: Pushed
2530717ff0bb: Pushed
cb411529b86f: Pushed
e7766bc830a8: Pushed
bc09720137db: Pushed
bdea7c663e86: Pushed
3dab9f8bf2d2: Pushed
latest: digest: sha256:952395dcce8eccffa5eb89f35b39b1dc37a1ea3cabd72fa4561bddf055f97ec5 size: 2407
2023/06/21 10:42:38 Successfully pushed image: acaanhvocap.azurecr.io/acs-to-teams-meeting:latest
2023/06/21 10:42:38 Step ID: build marked as successful (elapsed time in seconds: 267.480260)
2023/06/21 10:42:38 Populating digests for step ID: build...
2023/06/21 10:42:40 Successfully populated digests for step ID: build
2023/06/21 10:42:40 Step ID: push marked as successful (elapsed time in seconds: 3.676178)
2023/06/21 10:42:40 The following dependencies were found:
2023/06/21 10:42:40
- image:
    registry: acaanhvocap.azurecr.io
    repository: acs-to-teams-meeting
    tag: latest
    digest: sha256:952395dcce8eccffa5eb89f35b39b1dc37a1ea3cabd72fa4561bddf055f97ec5
  runtime-dependency:
    registry: registry.hub.docker.com
    repository: library/nginx
    tag: alpine
    digest: sha256:2d194184b067db3598771b4cf326cfe6ad5051937ba1132b8b7d4b0184e0d0a6
  buildtime-dependency:
  - registry: registry.hub.docker.com
    repository: library/node
    tag: lts
    digest: sha256:4a55308cc855cba1a925d19ae4e45838741dad2fd7bb8949a93b2a0f2ae339e3
  git: {}

Run ID: cm1 was successful after 4m36s