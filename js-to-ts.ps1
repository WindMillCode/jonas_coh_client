$folderPath = "."
$files = Get-ChildItem $folderPath -Filter "*.js"
foreach ($file in $files) {
   $newName = $file.Name -replace "\.js$", ".ts"
   Rename-Item $file.FullName -NewName $newName
 }
