@echo OFF
CLS
echo ----------------------------------
echo -
echo Pour relancer votre bot, faites CTRL + C puis "start_bot"
echo -
echo ----------------------------------
echo -
echo Appuyez sur une TOUCHE pour lancer votre bot
echo -
echo ----------------------------------
pause > nul
CLS
echo start_bot
echo ----------------------------------
cmd /k node .
pause