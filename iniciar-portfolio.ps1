$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
Set-Location -LiteralPath $PSScriptRoot
$portfolioNodeDirectory = Join-Path $PSScriptRoot '.tools\node'
$portfolioNode = Join-Path $portfolioNodeDirectory 'node.exe'
if (-not (Test-Path -LiteralPath $portfolioNode)) {
    $portfolioGlobalNode = Get-Command node.exe -ErrorAction SilentlyContinue
    if ($portfolioGlobalNode) {
        $portfolioNodeDirectory = Split-Path -Parent $portfolioGlobalNode.Source
    } else {
        Write-Host 'Preparando o Node.js portatil. Isso so acontece na primeira vez.'
        $portfolioVersion = 'v24.19.0'
        $portfolioArchiveName = "node-$portfolioVersion-win-x64.zip"
        $portfolioToolsDirectory = Join-Path $PSScriptRoot '.tools'
        New-Item -ItemType Directory -Path $portfolioToolsDirectory -Force | Out-Null
        $portfolioArchive = Join-Path $portfolioToolsDirectory $portfolioArchiveName
        $portfolioBaseUrl = "https://nodejs.org/dist/$portfolioVersion"
        Invoke-WebRequest -Uri "$portfolioBaseUrl/$portfolioArchiveName" -OutFile $portfolioArchive -UseBasicParsing
        $portfolioChecksums = (Invoke-WebRequest -Uri "$portfolioBaseUrl/SHASUMS256.txt" -UseBasicParsing).Content
        $portfolioExpectedLine = ($portfolioChecksums -split "`n" | Where-Object { $_.Trim().EndsWith($portfolioArchiveName) } | Select-Object -First 1)
        if (-not $portfolioExpectedLine) { throw 'Nao foi possivel validar o pacote do Node.js.' }
        $portfolioExpectedHash = ($portfolioExpectedLine.Trim() -split '\s+')[0]
        if ((Get-FileHash -LiteralPath $portfolioArchive -Algorithm SHA256).Hash -ne $portfolioExpectedHash) { throw 'O arquivo do Node.js nao passou na verificacao.' }
        Expand-Archive -LiteralPath $portfolioArchive -DestinationPath $portfolioToolsDirectory -Force
        $portfolioNodeDirectory = Join-Path $portfolioToolsDirectory "node-$portfolioVersion-win-x64"
    }
}
$env:Path = "$portfolioNodeDirectory;$env:Path"
if (-not (Test-Path -LiteralPath (Join-Path $PSScriptRoot 'node_modules\vinext'))) {
    & (Join-Path $portfolioNodeDirectory 'npm.cmd') ci
    if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel instalar as dependencias.' }
}
Write-Host 'O endereco do portfolio sera exibido abaixo. Use Ctrl+C para encerrar.'
& (Join-Path $portfolioNodeDirectory 'npm.cmd') run dev
exit $LASTEXITCODE
