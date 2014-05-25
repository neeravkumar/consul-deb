require "net/http"

$consul_files = {}
$consul_os = []

if ENV["CONSUL_VERSION"]
  raise "BINTRAY_API_KEY must be set." if !ENV["BINTRAY_API_KEY"]
  http = Net::HTTP.new("dl.bintray.com", 80)
  req = Net::HTTP::Get.new("/mitchellh/consul/")
  req.basic_auth "mitchellh", ENV["BINTRAY_API_KEY"]
  response = http.request(req)

  response.body.split("\n").each do |line|
    next if line !~ /\/mitchellh\/consul\/(#{Regexp.quote(ENV["CONSUL_VERSION"])}.+?)'/
    filename = $1.to_s
    os = filename.split("_")[1]
    next if os == "SHA256SUMS"
    next if os == "web"

    $consul_files[os] ||= []
    $consul_files[os] << filename
  end

  $consul_os = ["darwin", "linux", "windows"] & $consul_files.keys
  $consul_os += $consul_files.keys
  $consul_os.uniq!

  $consul_files.each do |key, value|
    value.sort!
  end
end

module DownloadHelpers
  def download_arch(file)
    parts = file.split("_")
    return "" if parts.length != 3
    parts[2].split(".")[0]
  end

  def download_os_human(os)
    if os == "darwin"
      return "Mac OS X"
    elsif os == "freebsd"
      return "FreeBSD"
    elsif os == "openbsd"
      return "OpenBSD"
    elsif os == "Linux"
      return "Linux"
    elsif os == "windows"
      return "Windows"
    else
      return os
    end
  end

  def download_url(file)
    "https://dl.bintray.com/mitchellh/consul/#{file}"
  end

  def ui_download_url
    download_url("#{latest_version}_web_ui.zip")
  end

  def latest_version
    ENV["CONSUL_VERSION"]
  end
end
