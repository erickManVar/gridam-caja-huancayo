# PowerShell script to download HTML content from Gridam Tech website
# Create directory for extracted HTML if it doesn't exist
$extractedDir = ".\extracted-html"
if (-not (Test-Path $extractedDir)) {
    New-Item -ItemType Directory -Path $extractedDir | Out-Null
    Write-Host "Created directory: $extractedDir"
} else {
    Write-Host "Directory already exists: $extractedDir"
}

# Define the pages to download
$pages = @(
    @{ Name = "home"; Url = "https://gridamtech.com/" },
    @{ Name = "about-us"; Url = "https://gridamtech.com/about-us/" },
    @{ Name = "portfolio"; Url = "https://gridamtech.com/portfolio/" },
    @{ Name = "contact"; Url = "https://gridamtech.com/contact/" }
)

# Download each page
foreach ($page in $pages) {
    $outputFile = Join-Path $extractedDir "$($page.Name).html"
    Write-Host "Downloading $($page.Url) to $outputFile..."
    
    try {
        $response = Invoke-WebRequest -Uri $page.Url -UseBasicParsing
        $htmlContent = $response.Content
        
        # Save HTML content to file
        $htmlContent | Out-File -FilePath $outputFile -Encoding utf8
        Write-Host "Successfully downloaded and saved to $outputFile"
    }
    catch {
        Write-Host "Error downloading $($page.Url): $_" -ForegroundColor Red
    }
}

Write-Host "Download complete. HTML files are saved in the $extractedDir directory."
