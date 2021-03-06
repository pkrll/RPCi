<p align="center">
  <img src=".assets/logo.png" data-canonical-src=".assets/logo.png" width="65%"/>
</p>
<p align="center">
  <a href="https://github.com/pkrll/Raspy/releases"><img src="https://img.shields.io/github/release/pkrll/raspy/all.svg?style=for-the-badge"></a>
<a href="https://github.com/prkll/Raspy/commits/master"><img src="https://img.shields.io/github/last-commit/pkrll/Raspy.svg?style=for-the-badge"></a>
<a href="https://github.com/pkrll/Raspy/issues"><img src="https://img.shields.io/github/issues/pkrll/Raspy.svg?style=for-the-badge"></a>
<a href="https://github.com/pkrll/Raspy/search?l=javascript"><img src="https://img.shields.io/github/languages/top/pkrll/Raspy.svg?style=for-the-badge"></a>
</p>

<img src=".assets/screenshot.png" data-canonical-src=".assets/screenshot.png" align="right" width="350px"/>

Raspbot is a lightweight REST API server, designed for the **Raspberry Pi**, as well as a client web application that let's you control your device with ease.

Built with [NodeJS](https://github.com/nodejs/node) & [Express 4](https://github.com/expressjs/express/) and [Vue 2](https://github.com/vuejs/vue) & [Webpack](https://github.com/webpack/webpack).

**Raspbot is still a work in progress**.

**Features:**

- [x] 📂 Browse file system
- [x] ⬇️ Download files
- [ ] ⬆️ <s>Upload files</s>
- [ ] ↘️ Move files
- [x] 🗑️ Delete files
- [x] 📁 Create folders
- [x] 🔌 Reboot & shutdown system
- [x] 💾 Mount & unmount USB devices
- [x] 🌡️ Check temperature, CPU, memory and disk usage.
- [x] 🎛️ Update, restart & stop Raspbot remotely

Check out a [**demo here**](https://raspbot-app.herokuapp.com) (sign in with username ``admin`` and password ``secret``).

## Table of Contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
  * [Manually building the client (optional)](#manually-building-the-client-optional)
* [Running the server](#running-the-server)
  * [With a process manager](#with-a-process-manager)
    * [Run the server with PM2](#run-the-server-with-pm2)
    * [Stop the server with PM2](#stop-the-server-with-pm2)
    * [Autostart server on boot](#autostart-server-on-boot)
* [Usage](#usage)
* [Configurations](#configurations)
  * [Enabling HTTPS](#enabling-https)
  * [Reboot, shutdown and mount/unmount](#system-commands)


## Prerequisites

* Node Package Manager (__recommended version 5.7.1+__)
* NodeJS (__recommended version 10.4.1+__)
* Python (__developed for version 2.7.10__)
  * psutil library (__developed using version 5.4.3__)

**Optional(-ish):**
* PM2 (__required to update, restart or stop Raspbot remotely__)

## Installation

Clone this repository on your Raspberry Pi:

```bash
$ git clone https://github.com/pkrll/Raspy
```

And run ``make install`` in the project root folder to install and set up the server:

```bash
$ cd Raspy
$ make install
```

### Manually building the client (optional)

The folder ``dist`` inside ``./raspbot`` already contains the latest build of the client. Running the server will use the files there. You can also manually build the client app, by typing ``make build`` in the root folder. This might take a while, so grab a snack and wait for the installation and build processes to finish.

## Running the server

After installing all dependencies and setting up the server, you can run the server with ``make server`` in the root folder.

It is, though, recommended to use a process manager to run the server.

### With a process manager

To daemonize the application, you can use [``PM2``](https://github.com/Unitech/pm2), which is a process manager for NodeJS applications. If you do not have ``PM2`` already, install it:

```bash
$ sudo npm install -g pm2
```

#### Run the server with PM2

Use ``make start`` to run the server in the background. The ``NODE_ENV`` will automatically be set to "production" when using the ``start`` rule.

```bash
$ make start

[PM2] Applying action restartProcessId on app [server](ids: 0)
[PM2] [server](0) ✓
[PM2] Process successfully started
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬───────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user  │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼───────┼──────────┤
│ Raspbot  │ 0  │ fork │ 13141 │ online │ 0       │ 0s     │ 66% │ 13.9 MB   │ pkrll │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴───────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app

```

#### Stop the server with PM2

Use ``make stop`` to stop the server.

#### Autostart server on boot

Follow these steps to make ``PM2`` run on startup.

1. Start the application with ``make start`` (if not already running).
2. Save the current process list with ``pm2 save``.
3. Run ``pm2 startup systemd`` and copy and paste the command produced by the script.

**Example**

```bash
$ make start

$ pm2 save
[PM2] Saving current process list...
[PM2] Successfully saved in /home/pkrll/.pm2/dump.pm2

$ pm2 startup systemd
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:[...] startup systemd -u USER --hp /home/USER

$ sudo env PATH=$PATH:[...] startup systemd -u USER --hp /home/USER
```

For more information on how to use PM2, check out **[the official documentation](http://pm2.keymetrics.io/.assets/usage/cluster-mode/)** or **[this quickstart guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04#manage-application-with-pm2)**.

## Usage

By default, Raspbot runs on port 5000 and can be accessed by ``http://ip-to-your-pi:5000``. The default username is ``admin`` with the password ``secret``. Be sure to change this.

## Configurations

The configuration options can be found in the file ``index.js`` inside the ``./raspbot/config`` directory:

| Option | Description |
|--------|-------------|
| ``oauth.id`` | Github OAuth key for making authenticated requests when checking for updates (optional) |
| ``oauth.secret`` | Github OAuth secret for making authenticated requests when checking for updates (optional) |
| ``port`` | The server port (**default: 5000**) |
| ``httpsPort`` | The port to use for HTTPs (**default: 5443**) |
| ``databasePath`` | Path to user credentials database (**default: config/db.json**) |
| ``httpsOpts.cert`` | Path to SSL certificate (**default: config/.sslcert/fullchain.pem**) |
| ``httpsOpts.key`` | Path to SSL certificate key (**default: config/.sslcert/privkey.pem**) |

**Note:** The ``httpsOpts`` options are used when enabling HTTPs (See [Enabling HTTPs](#enabling-https) below).

### Enabling HTTPS

To serve Raspbot over ``HTTPs``, you need to put your SSL certificate files (``fullchain.pem`` and ``privkey.pem``) in the folder ``config/.sslcert``.

#### Example

Below follows a guide on how to generate certificates using Certbot and Let's encrypt. For more information [see this article](https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625).

##### Generate certificates

First make sure you have [Certbot](https://certbot.eff.org) and *Let's encrypt* installed, and the ports ``80`` and ``443`` forwarded to ``5000`` and ``5443`` (or, if overridden, the custom ports you've used).

Navigate to the folder ``raspbot`` in the project directory and run the following command (**NOTE:** Remember to change *example.com* to your URL):

```bash
$ certbot certonly --webroot -w ./dist -d example.com --config-dir ~/.certbot/config --logs-dir ~/.certbot/logs --work-dir ~/.certbot/work
```

Follow the instructions, and wait for it finish.

##### Add the certificate

If you're using the default [configurations](https://github.com/pkrll/Raspy/wiki/Configurations), you can now symlink the certificate to the folder ``config/.sslcert`` in the folder ``raspbot/raspbot`` (**NOTE:** Remember to change *example.com* to your URL):

```bash
$ cd /path/to/raspbot
$ ln -s ~/.certbot/config/live/example.com/fullchain.pem raspbot/config/.sslcert/fullchain.pem
$ ln -s ~/.certbot/config/live/example.com/privkey.pem raspbot/config/.sslcert/privkey.pem
```

Restart the server.

### System commands

Raspbot enables you to remotely shutdown or reboot your device and mount/unmount devices connected to the Raspberry Pi, but for these commands to work the user running the server must have permission to execute ``sudo /sbin/reboot`` and ``sudo /sbin/shutdown``, (defined in the ``Makefile``), as well as ``sudo mount`` and ``sudo umount``.

This can be done by adding the line

```bash
USERNAME ALL=NOPASSWD: /sbin/reboot,/sbin/shutdown,/bin/mount,/bin/umount
```

to ``/etc/sudoers`` using ``sudo visudo``, where ``USERNAME`` should be replaced with the username of the user running the server. Make sure to add it after any previous configurations for that user.

## Author

Raspbot was created by [**Ardalan Samimi**](https://github.com/pkrll). The robot icon was created by [FontAwesome](https://fontawesome.com/license) and is licensed under the [CC by 4.0 license](https://creativecommons.org/licenses/by/4.0/).
