



var titleCode = "function handleDocumentKeyDownEvent(event) { \
    if (consoleCharList.indexOf(event.key.toLowerCase()) >= 0) { \
        $(\"#typed_text\").append(event.key); \
    } else if (event.key == \"Enter\") { \
        let typedText = $(\"#typed_text\").html(); \
        let commandIndex = typedText.lastIndexOf(prompt); \
        let command = typedText; \
        if (commandIndex > 0) { \
            command = typedText.substring(commandIndex+prompt.length); \
        } \
        executeConsoleCommand(command); \
    } else if (event.key == \"Backspace\") { \
        let typedText = $(\"#typed_text\").html(); \
        if (typedText.length > 0) { \
            let commandIndex = typedText.lastIndexOf(prompt); \
            let command = typedText; \
            if (commandIndex > 0) { \
                command = typedText.substring(commandIndex+prompt.length); \
            } \
            if (command.length > 0) { \
                $(\"#typed_text\").html(typedText.substring(0, typedText.length - 1)); \
            } \
        } \
    } else if (event.key == \"+\") { \
        //binding tab behaviour to the + key \
        //in theory, I should be able to cheat with tab, as each command starts with a different letter. \
 \
        let typedText = $(\"#typed_text\").html(); \
        let commandIndex = typedText.lastIndexOf(prompt); \
        let command = typedText; \
        let hasDotPathAlready = false; \
        if (commandIndex > 0) { \
            command = typedText.substring(commandIndex+prompt.length); \
        } \
        if (command.length > 0) { \
            if (command.startsWith(\"./\")) { \
                command = command.replace(\"./\",\"\"); \
                hasDotPathAlready = true; \
            } \
            if (command.startsWith(\".\")) { \
                command = command.replace(\".\",\"\"); \
            } \
        } \
        if (command.length > 0) { \
            let fullCommandName = \"\"; \
            for (commandName of consoleCommands){ \
                if (commandName.toLowerCase().startsWith(command.toLowerCase())) { \
                    fullCommandName = commandName; \
                } \
            } \
            let fileNamePosition = homeDirFiles.indexOf(fullCommandName) \
            if (fileNamePosition >= 0 && hasDotPathAlready) { \
                fullCommandName = fullCommandName; \
            } else if (fileNamePosition >= 0) { \
                fullCommandName = \"./\"+fullCommandName; \
            } \
 \
            if (fullCommandName.length > 0) { \
                $(\"#typed_text\").html(typedText.substring(0, typedText.length - command.length)); \
                $(\"#typed_text\").append(fullCommandName); \
            } \
        } \
    } else if (event.key == \"ArrowUp\" || event.key == \"ArrowDown\") { \
        if ( ( commandScrollbackIdx < ( commandScrollback.length - 1 ) ) && event.key == \"ArrowUp\") { \
            commandScrollbackIdx++; \
        } else if (commandScrollbackIdx >= 0 && event.key == \"ArrowDown\") { \
            commandScrollbackIdx--; \
        } \
 \
        var newCommand = \"\"; \
        if (commandScrollbackIdx >= 0 && commandScrollbackIdx < commandScrollback.length){ \
            newCommand = commandScrollback[commandScrollbackIdx]; \
        } \
 \
        let typedText = $(\"#typed_text\").html(); \
        let commandIndex = typedText.lastIndexOf(prompt); \
        let command = typedText; \
        if (commandIndex > 0) { \
            command = typedText.substring(commandIndex+prompt.length); \
        } \
        $(\"#typed_text\").html(typedText.substring(0, typedText.length - command.length)); \
        $(\"#typed_text\").append(newCommand); \
    } \
    $(\"#terminal_render_area\").scrollTop($(\"#terminal_render_area\").height()); \
}";
