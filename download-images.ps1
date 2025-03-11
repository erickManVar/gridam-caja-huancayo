$imageUrls = @(
    # Logo
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/09/gridam-blanco.png"
        OutFile = "images/gridam-blanco.png"
    },
    # Black logo
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2025/02/cropped-gridam-negro.png"
        OutFile = "images/gridam-negro.png"
    },
    # Hero background
    @{
        Url = "https://source.unsplash.com/random/1920x1080/?technology"
        OutFile = "images/hero-bg.jpg"
    },
    # About image
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/image1-home3.png"
        OutFile = "images/about-image.png"
    },
    # Team member images
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/04/member1.jpg"
        OutFile = "images/team/member1.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/04/member2.jpg"
        OutFile = "images/team/member2.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/04/member3.jpg"
        OutFile = "images/team/member3.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/04/member4.jpg"
        OutFile = "images/team/member4.jpg"
    },
    # Portfolio images
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2019/11/project1-720x720.jpg"
        OutFile = "images/project1.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2019/11/project2-720x720.jpg"
        OutFile = "images/project2.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2019/11/project4-720x720.jpg"
        OutFile = "images/project3.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2019/11/project6-720x720.jpg"
        OutFile = "images/project4.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2019/11/project10-720x720.jpg"
        OutFile = "images/project5.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2019/11/project11-720x720.jpg"
        OutFile = "images/project6.jpg"
    },
    # Service images
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/service1.jpg"
        OutFile = "images/services/web-development.jpg"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/service2.jpg"
        OutFile = "images/services/mobile-development.jpg"
    },
    # Client logos
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/client-1.png"
        OutFile = "images/clients/client1.png"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/client-2.png"
        OutFile = "images/clients/client2.png"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/client-3.png"
        OutFile = "images/clients/client3.png"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/client-4.png"
        OutFile = "images/clients/client4.png"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/client-5.png"
        OutFile = "images/clients/client5.png"
    },
    @{
        Url = "https://gridamtech.com/wp-content/uploads/2020/03/client-6.png"
        OutFile = "images/clients/client6.png"
    }
)

# Create directories if they don't exist
$directories = @("images/team", "images/services", "images/clients")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir"
    }
}

foreach ($image in $imageUrls) {
    Write-Host "Downloading $($image.Url) to $($image.OutFile)"
    try {
        Invoke-WebRequest -Uri $image.Url -OutFile $image.OutFile
        Write-Host "Downloaded successfully"
    } catch {
        Write-Host "Failed to download: $_"
    }
}

Write-Host "All downloads completed"
