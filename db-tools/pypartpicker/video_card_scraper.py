import csv
import time
import random
from datetime import datetime
from pypartpicker import Scraper

# Initialize scraper
scraper = Scraper()

# scrape Video Card data from Asus, EVGA (mostly GeForce), Gigabyte, MSI, and XFX (RX series only) 
def scrape_video_card():
  # .part_search() to fetch Part objects of type 'Video Card'
  '''
  # GeForce GTX 1660, 1660 SUPER, 1660 Ti
  gpu = scraper.part_search("asus geforce gtx 166", limit=9, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("evga geforce gtx 166", limit=5, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("gigabyte geforce gtx 166", limit=5, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("msi geforce gtx 166", limit=11, region="us")
  time.sleep(random.uniform(5, 7))
  
  # GeForce RTX 3050 6GB, 3050 8GB, 3060 8GB, 3060 12GB, 3060 Ti, 3070, 3070 Ti, 3080 10GB, 3080 Ti, 3090, 3090 Ti
  gpu += scraper.part_search("pcie x16 asus geforce rtx 3050", limit=8, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 asus geforce rtx 3060", limit=4, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 asus geforce rtx 3070", limit=8, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 asus geforce rtx 3080", limit=11, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 asus geforce rtx 3090", limit=4, region="us")
  time.sleep(random.uniform(5, 7))
  
  gpu += scraper.part_search("pcie x16 evga geforce rtx 3050", limit=1, region="us")
  gpu += scraper.part_search("pcie x16 evga geforce rtx 3060", limit=6, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 evga geforce rtx 3070", limit=6, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 evga geforce rtx 3080", limit=8, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 evga geforce rtx 3090", limit=4, region="us")
  time.sleep(random.uniform(5, 7))
  
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 3050", limit=4, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 3060", limit=4, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 3070", limit=6, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 3080", limit=6, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 3090", limit=7, region="us")
  time.sleep(random.uniform(8, 11))
  
  gpu += scraper.part_search("pcie x16 msi geforce rtx 3050", limit=7, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 msi geforce rtx 3060", limit=6, region="us")
  time.sleep(random.uniform(5, 7))
  gpu += scraper.part_search("pcie x16 msi geforce rtx 3070", limit=6, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 msi geforce rtx 3080", limit=9, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 msi geforce rtx 3090", limit=4, region="us")
  time.sleep(random.uniform(8, 11))
  
  # GeForce RTX 4060, 4060 Ti, 4070, 4070 SUPER, 4070 Ti SUPER, 4080, 4080 SUPER, 4090
  gpu += scraper.part_search("pcie x16 asus geforce rtx 4060", limit=16, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 asus geforce rtx 4070", limit=20, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 asus geforce rtx 4080", limit=16, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 asus geforce rtx 4090", limit=10, region="us")
  time.sleep(random.uniform(8, 11))
  
  # EVGA stopped manufacturing video cards a month before 40 series came out (oct 2022)
  
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 4060", limit=16, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 4070", limit=20, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 4080", limit=11, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 gigabyte geforce rtx 4090", limit=5, region="us")
  time.sleep(random.uniform(8, 11))
  
  gpu += scraper.part_search("pcie x16 msi geforce rtx 4060", limit=11, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 msi geforce rtx 4070", limit=19, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 msi geforce rtx 4080", limit=12, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 msi geforce rtx 4090", limit=5, region="us")
  '''
  
  # Radeon RX 500 and 5000 series
  gpu = scraper.part_search("asus radeon rx 5", limit=15, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 5", limit=22, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 5", limit=7, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("msi radeon rx 5", limit=26, region="us")
  time.sleep(random.uniform(8, 11))
  
  # Radeon RX 6000 series
  gpu += scraper.part_search("asus radeon rx 65", limit=2, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("asus radeon rx 66", limit=8, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("asus radeon rx 67", limit=4, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("asus radeon rx 68", limit=7, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("asus radeon rx 69", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  
  gpu += scraper.part_search("xfx speedster SWFT 105 Radeon RX 6400 4 GB Video Card", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 65", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 66", limit=7, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 67", limit=10, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 68", limit=7, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 69", limit=7, region="us")
  time.sleep(random.uniform(8, 11))
  
  gpu += scraper.part_search("gigabyte radeon rx 65", limit=2, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 66", limit=6, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 67", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 68", limit=5, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 69", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  
  gpu += scraper.part_search("msi radeon rx 65", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("msi radeon rx 66", limit=5, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("msi radeon rx 67", limit=7, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("msi radeon rx 68", limit=3, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("msi radeon rx 69", limit=3, region="us")
  time.sleep(random.uniform(8, 11))

  # Radeon RX 7000 series
  gpu += scraper.part_search("asus radeon rx 76", limit=5, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("asus radeon rx 77", limit=2, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("asus radeon rx 78", limit=2, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("asus radeon rx 79", limit=5, region="us")
  time.sleep(random.uniform(8, 11))
  
  gpu += scraper.part_search("gigabyte radeon rx 76", limit=2, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 77", limit=6, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 78", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 79", limit=2, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("gigabyte radeon rx 69", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  
  gpu += scraper.part_search("msi radeon rx 76", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("msi radeon rx 79", limit=1, region="us")
  time.sleep(random.uniform(8, 11))
  
  gpu += scraper.part_search("pcie x16 xfx radeon rx 76", limit=4, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 77", limit=2, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 78", limit=5, region="us")
  time.sleep(random.uniform(8, 11))
  gpu += scraper.part_search("pcie x16 xfx radeon rx 79", limit=5, region="us")
  
  # Random delay to avoid rate limiting
  time.sleep(random.uniform(8, 11))
  return gpu
  
def process_data(video_cards):
  # Initialize lists for each table
  parts_data = []
  video_card_data = []
  timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
  #part_id = 1399
  part_id = 1638
  #gpu_id = 0
  gpu_id = 239
  
  for gpu in video_cards:
    if gpu.price and gpu.image:
      gpu_product = scraper.fetch_product(gpu.url)
      # Exclude Video Cards that do not have 1-3 cooling fan(s)
      gpu_fans = gpu_product.specs.get("Cooling")
      if gpu_fans != None:
        if gpu_fans[0] != '1 Fan' and gpu_fans[0] != '2 Fans' and gpu_fans[0] != '3 Fans':
          time.sleep(random.uniform(7, 10))
          continue
      
      # Exclude RTX LHR 30 series and RX VEGA 56 & 64 
      gpu_chipset = gpu_product.specs.get("Chipset")
      if gpu_chipset != None:
        #if gpu_chipset[0] == 'GeForce RTX 3060 Ti LHR' or gpu_chipset[0] == 'GeForce RTX 3070 LHR' or gpu_chipset[0] == 'GeForce RTX 3080 10GB LHR' or gpu_chipset[0] == 'GeForce RTX 3080 12GB LHR':
          #time.sleep(random.uniform(7, 10))
          #continue
        if gpu_chipset[0] == 'Radeon RX VEGA 56' or gpu_chipset[0] == 'Radeon RX VEGA 64':
          time.sleep(random.uniform(7, 10))
          continue
      part_id += 1
      gpu_id += 1
          
      # Handle price
      price = float(gpu.price.replace("$", ""))
        
      # Prepare Part table data
      parts_data.append((
        part_id,
        gpu.name,
        gpu_product.type,
        gpu.image,
        price,
        gpu_product.specs.get('Manufacturer')[0],
        gpu_product.specs.get("Part #")[0],
        timestamp,
        timestamp
      ))

      # Prepare Motherboard table data
      specs = gpu_product.specs
      
      # Handle memory attribute
      memory = specs.get("Memory")[0].replace(" GB", "")
      int(memory)
      
      # Handle coreClock attribute
      core_clock = specs.get("Core Clock")[0].replace(" MHz", "")
      int(core_clock)
      
      # Handle bootClock attribute
      boost_clock = None
      if specs.get("Boost Clock") != None:
        boost_clock = specs.get("Boost Clock")[0].replace(" MHz", "")
        int(boost_clock)
      
      # Handle effectiveMemoryClock attribute
      effective_memory_clock = None
      if specs.get("Effective Memory Clock") != None:
        effective_memory_clock = specs.get("Effective Memory Clock")[0].replace(" MHz", "")
        int(effective_memory_clock)
        
      # Handle color attribute
      color = 'N/A'
      if specs.get("Color") != None:
        color = specs.get("Color")[0]
        
      # Handle length attribute
      length = 1234
      if specs.get("Length") != None:
        length = specs.get("Length")[0].replace(" mm", "")
        int(length)
      elif specs.get("Length") == None and specs.get("Cooling") != None:
        if specs.get("Cooling")[0] == '1 Fan':
          length = 150
        elif specs.get("Cooling")[0] == '2 Fans':
          length = 200
        elif specs.get("Cooling")[0] == '3 Fans':
          length = 300
          
      # Handle tdp attribute
      tdp = 111 # if value in CSV is 111, manually edit accordingly
      if specs.get("TDP") != None:
        tdp = specs.get("TDP")[0].replace(" W", "")
        int(tdp)
      
      # Handle coolingFan attribute
      if gpu_fans == '1 Fan':
        cooling = 1
      elif gpu_fans == '2 Fan':
        cooling = 2
      else:
        cooling = 3

      # Handle externalPower attribute
      if specs.get("External Power") != None:
        external_power = specs.get("External Power")[0]
        
      # Handle dpOutput attribute
      dp_outputs = 111 # if value in CSV is 111, manually edit accordingly
      if specs.get("DisplayPort 2.1 Outputs") != None:
        dp_outputs = int(specs.get("DisplayPort 2.1 Outputs")[0])
      elif specs.get("DisplayPort 2.1a Outputs") != None:
        dp_outputs = int(specs.get("DisplayPort 2.1a Outputs")[0])
      elif specs.get("DisplayPort 1.4 Outputs") != None:
        dp_outputs = int(specs.get("DisplayPort 1.4 Outputs")[0])
      elif specs.get("DisplayPort 1.4a Outputs") != None:
        dp_outputs = int(specs.get("DisplayPort 1.4a Outputs")[0])
      elif specs.get("DisplayPort Outputs") != None:
        dp_outputs = int(specs.get("DisplayPort Outputs")[0])  
      
      # Handle hdmiOutput attribute
      hdmi_outputs = 111 # if value in CSV is 111, manually edit accordingly
      if specs.get("HDMI 2.1 Outputs") != None:
        hdmi_outputs = int(specs.get("HDMI 2.1 Outputs")[0])
      elif specs.get("HDMI 2.1a Outputs") != None:
        hdmi_outputs = int(specs.get("HDMI 2.1a Outputs")[0])
      elif specs.get("HDMI 1.4 Outputs") != None:
        hdmi_outputs = int(specs.get("HDMI 1.4 Outputs")[0])
      elif specs.get("HDMI 1.4a Outputs") != None:
        hdmi_outputs = int(specs.get("HDMI 1.4a Outputs")[0])
      elif specs.get("HDMI Outputs") != None:
        hdmi_outputs = int(specs.get("HDMI Outputs")[0])  
      
      video_card_data.append((
        gpu_id,
        part_id,
        gpu_chipset[0],
        memory,
        specs.get("Memory Type")[0],
        core_clock,
        boost_clock,
        effective_memory_clock,
        color,
        specs.get("Frame Sync")[0],
        length,
        tdp,
        int(specs.get("Case Expansion Slot Width")[0]),
        int(specs.get("Total Slot Width")[0]),
        cooling,
        external_power,
        dp_outputs,
        hdmi_outputs,
        timestamp,
        timestamp
      ))
      
      time.sleep(random.uniform(8, 11))
    else:
      time.sleep(random.uniform(7, 10))  
  return parts_data, video_card_data

def export_data_to_csv(parts_data, video_card_data):
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  # Part - Video Cards (Asus, EVGA (mostly GeForce), Gigabyte, MSI, and XFX (RX series only))
  #parts_file = f"Parts_GeForce_GPU_{timestamp}.csv"
  parts_file = f"Parts_Radeon_GPU_{timestamp}.csv"
  
  # Video Cards - Nvidia GeForce and AMD Radeon
  #video_card_file = f"Video_Card_GeForce_{timestamp}.csv"
  video_card_file = f"Video_Card_Radeon_{timestamp}.csv"
  
  with open(parts_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["partId", "name", "type", "image", "price", "manufacturer", "partNum", "createdAt", "updatedAt"])
    writer.writerows(parts_data)

  with open(video_card_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["storageId", "partId", "chipset", "memory", "memoryType", "coreClock", "boostClock", "effectiveMemoryClock", "color", "frameSync", "length", "tdp", "caseSlotWidth", "totalSlotWidth", "coolingFan", "externalPower", "dpOutput", "hdmiOutput", "createdAt", "updatedAt"])
    writer.writerows(video_card_data)

if __name__ == "__main__":
  gpu = scrape_video_card()
  parts_data, video_card_data = process_data(gpu)
  export_data_to_csv(parts_data, video_card_data)