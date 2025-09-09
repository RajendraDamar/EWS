param(
  [string]$FileKey = "AmqqSvBAueyNwzP8YkUe4P",
  [string[]]$NodeIds = @("536:81536"),
  [string]$OutDir = "src/assets",
  [string]$OutName # optional: if provided and only one NodeId is given, save as this filename
)

if (-not $env:FIGMA_TOKEN) {
  Write-Error "FIGMA_TOKEN environment variable is not set. Create a Figma personal access token and set FIGMA_TOKEN."
  exit 1
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

foreach ($node in $NodeIds) {
  $encoded = [uri]::EscapeDataString($node)
  $url = "https://api.figma.com/v1/images/$FileKey?ids=$encoded&format=png&scale=2"
  try {
    $resp = Invoke-RestMethod -Headers @{ "X-Figma-Token" = $env:FIGMA_TOKEN } -Uri $url -Method GET
    $imgUrl = $resp.images.$node
    if (-not $imgUrl) { Write-Warning "No URL for node $node. Trying hyphen id..." }

    if (-not $imgUrl -and $node -match ":") {
      $alt = $node -replace ":", "-"
      $resp2 = Invoke-RestMethod -Headers @{ "X-Figma-Token" = $env:FIGMA_TOKEN } -Uri ("https://api.figma.com/v1/images/$FileKey?ids=$([uri]::EscapeDataString($alt))&format=png&scale=2") -Method GET
      $imgUrl = $resp2.images.$alt
    }

    if ($imgUrl) {
      $name = if ($OutName -and $NodeIds.Length -eq 1) { $OutName } else { ("{0}.png" -f ($node -replace ":", "-")) }
      $dest = Join-Path $OutDir $name
      Invoke-WebRequest -Uri $imgUrl -OutFile $dest
      Write-Host "Saved: $dest"
    } else {
      Write-Warning "Unable to resolve image URL for node $node"
    }
  } catch {
    Write-Error $_
  }
}
