const prompt = "em@here:~$";

const consoleCharList = "abcdefghijklmnopqrstuvwxyz0123456789-_.//";

const consoleCommands = ["EmCarter.sh",
                        "DesignReviewRumble.sh",
                        "BugZapper.sh",
                        "IterativeFantasyXII.sh",
                        "SimSiteMap.sh",
                        "ls",
                        "clear",
                        "help"];

const homeDirFiles = ["EmCarter.sh",
                        "DesignReviewRumble.sh",
                        "BugZapper.sh",
                        "IterativeFantasyXII.sh",
                        "SimSiteMap.sh"];

var delayDone = false;
var delay = 3000;
var lineDelay = 1000;
var speed = 50;

var idx = 0;
var line = 0;
var spanName = ["text_block_1", "text_block_1", "text_block_1", "text_block_2", "text_block_3", "text_block_3"];

var lines = ["./EmCarter.sh",
            "Programmer.",
            "UX/UI Designer.",
            "Problem Solver.",
            ""];



var finish = prompt;

// a little bit of inspiration from https://www.w3schools.com/howto/howto_js_typewriter.asp
// then I pushed it a little bit further.
function typeThatConsole() {
    if (!delayDone) {
        delayDone = true;
        setTimeout(typeThatConsole, delay);
    } else if (line == lines.length) {
        document.getElementById(spanName[line-1]).innerHTML += finish;
        toggleInteractiveConsole(true);
    } else if (line < lines.length && idx == lines[line].length) {
        //verified that && short circuits like java
        idx = 0;
        line++;
        document.getElementById(spanName[line]).innerHTML += "<br/>"
        setTimeout(typeThatConsole, lineDelay);
    } else if (line < lines.length && idx < lines[line].length) {
        document.getElementById(spanName[line]).innerHTML += lines[line].charAt(idx);
        idx++;
        setTimeout(typeThatConsole, speed);
    }
}

function resetConsoleTypeAnimation() {
    idx = 0;
    line = 0;
}

function toggleInteractiveConsole(isConsoleInteractive) {
    if (isConsoleInteractive) {
        document.addEventListener("keydown", handleDocumentKeyDownEvent);
        $("#interactive_mode_indicator").css("display", "inline");
    } else {
        $("#interactive_mode_indicator").css("display", "none");
        document.removeEventListener("keydown", handleDocumentKeyDownEvent);
    }
}

function handleDocumentKeyDownEvent(event) {
    console.log(event.key);
    if (consoleCharList.indexOf(event.key.toLowerCase()) >= 0) {
        $("#typed_text").append(event.key);
    } else if (event.key == "Enter") {
        let typedText = $("#typed_text").html();
        let commandIndex = typedText.lastIndexOf(prompt);
        let command = typedText;
        if (commandIndex > 0) {
            command = typedText.substring(commandIndex+prompt.length);
        }
        executeConsoleCommand(command);
    } else if (event.key == "Backspace") {
        let typedText = $("#typed_text").html();
        if (typedText.length > 0) {
            let commandIndex = typedText.lastIndexOf(prompt);
            let command = typedText;
            if (commandIndex > 0) {
                command = typedText.substring(commandIndex+prompt.length);
            }
            if (command.length > 0) {
                $("#typed_text").html(typedText.substring(0, typedText.length - 1));
            }
        }
    } else if (event.key == "+") {
        //binding tab behaviour to the + key
        //in theory, I should be able to cheat with tab, as each command starts with a different letter.

        let typedText = $("#typed_text").html();
        let commandIndex = typedText.lastIndexOf(prompt);
        let command = typedText;
        if (commandIndex > 0) {
            command = typedText.substring(commandIndex+prompt.length);
        }
        if (command.length > 0) {
            let fullCommandName = "";
            for (commandName of consoleCommands){
                if (commandName.toLowerCase().startsWith(command.toLowerCase())) {
                    fullCommandName = commandName;
                }
            }
            let fileNamePosition = homeDirFiles.indexOf(fullCommandName)
            if (fileNamePosition > 0) {
                fullCommandName = "./"+fullCommandName;
            }

            if (fullCommandName.length > 0) {
                $("#typed_text").html(typedText.substring(0, typedText.length - command.length));
                $("#typed_text").append(fullCommandName);
            }
        }
    }
    //TODO console scroll
    $("#terminal_render_area").scrollTop($("#terminal_render_area").height());
}

function executeConsoleCommand(command) {
    if (command == "EmCarter.sh" || command == "./EmCarter.sh") {
        clearConsole();
        toggleInteractiveConsole(false);
        resetConsoleTypeAnimation();
        typeThatConsole();
    } else if (command == "ls") {
        $("#typed_text").append("<br/>");
        for (fileName of homeDirFiles) {
            $("#typed_text").append(fileName+"<br/>");
        }
        $("#typed_text").append(prompt);
    } else if (command == "clear") {
        clearConsole();
    } else if (command == "DesignReviewRumble.sh" || command == "./DesignReviewRumble.sh") {
        $("#typed_text").append("<br/>&lt;Launching Design Review Rumble, that button mashing fighter game.&gt<br/>"+prompt);
    } else if (command == "BugZapper.sh" || command == "./BugZapper.sh") {
        $("#typed_text").append("<br/>&lt;Launching some arcade madeness with Bug Zapper!&gt<br/>"+prompt);
    } else if (command == "IterativeFantasyXXXII.sh" || command == "./IterativeFantasyXII.sh") {
        $("#typed_text").append("<br/>&lt;Launching that classic JRPG, Iterative Fantasy XXXII&gt<br/>"+prompt);
    } else if (command == "SimSiteMap.sh" || command == "./SimSiteMap.sh") {
        $("#typed_text").append("<br/>&lt;Launching the epic simulation game, SimSiteMap!&gt<br/>"+prompt);
    } else if (command == "") {
        $("#typed_text").append("<br/>"+prompt);
    } else if (command == "help") {
        clearConsole();
        $("#typed_text").append("<br/>");
        $("#typed_text").append("Welcome to the interactive console!<br/>");
        $("#typed_text").append("<br/>");
        $("#typed_text").append("ls:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;List the files in this directory.<br/>");
        $("#typed_text").append("clear:&nbsp;&nbsp;Clear the console scroll history.<br/>");
        $("#typed_text").append("help:&nbsp;&nbsp;&nbsp;This help guide!<br/>");
        $("#typed_text").append("<br/>");
        $("#typed_text").append("Press + instead of tab for command completion.<br/>");
        $("#typed_text").append("<br/>"+prompt);
    } else {
        $("#typed_text").append("<br/>Unrecognised command '"+command.replace("./","")+"'.<br/>"+prompt);
    }
}

function clearConsole() {
    $("#text_block_1").html("");
    $("#text_block_2").html("");
    $("#text_block_3").html("");
    $("#typed_text").html("");
}