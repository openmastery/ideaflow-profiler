DIR_NAME='test/data/drgonzo'
FILE_NAME='add_idle_event.ifm'
FILE_ROOT=$(echo $FILE_NAME | sed 's/.ifm//') 

echo "[" >> "$FILE_ROOT.json"
sed "s/ (/: {/;s/)/},/;s/'''/'/g;s/'/\"/g;" "$DIR_NAME/$FILE_NAME" >> "$FILE_ROOT.json"
echo "]" >> "$FILE_ROOT.json"
