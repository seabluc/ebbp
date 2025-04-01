import csv
import time
import random
from datetime import datetime
from pypartpicker import Scraper

# Initialize scraper
scraper = Scraper()

# scrape mobo data from these manufacturers: [ASRock, Asus, Gigabyte, MSI] w/ these socket types: [LGA1851, LGA1700, AM5, AM4]
def scrape_motherboards():
  # .part_search() to fetch Part objects of type 'Motherboard'
  
  # All LGA1851 Motherboards (Theres only 64 of them, with the manufacturers being ^)
  #motherboards = scraper.part_search('motherboard lga1851', limit=64, region='us') # 50 parts 11/25/24
  
  # Asus motherboards
  #motherboards = scraper.part_search('motherboard asus lga1700', limit=100, region='us')
  #motherboards += scraper.part_search('motherboard asus am5', limit=100, region='us')
  #motherboards += scraper.part_search('motherboard asus am4', limit=100, region='us')
  
  # ASRock motherboards
  #motherboards = scraper.part_search('motherboard asrock lga1700', limit=66, region='us')
  #motherboards += scraper.part_search('motherboard asrock am5', limit=36, region='us')
  #motherboards += scraper.part_search('motherboardasrock am4', limit=62, region='us')
  
  # Gigabyte
  #motherboards = scraper.part_search('motherboard gigabyte lga1700', limit=93, region='us')
  #motherboards += scraper.part_search('motherboard gigabyte am5', limit=47, region='us')
  #motherboards += scraper.part_search('motherboard gigabyte am4', limit=58, region='us')
  
  # MSI motherboards
  motherboards = scraper.part_search('motherboard msi lga1700', limit=73, region='us')
  motherboards += scraper.part_search('motherboard msi am5', limit=25, region='us')
  motherboards += scraper.part_search('motherboard msi am4', limit=34, region='us')
  
  # Random delay to avoid rate limiting
  time.sleep(random.uniform(7, 10))
  return motherboards
  
def process_data(motherboards):
  # Initialize lists for each table
  parts_data = []
  motherboards_data = []
  memory_speeds_data = []
  timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
  #part_id = 121 # CPU entries occupy partId 0 - 121, hence starting at 121, incremented to 122
  #part_id = 171 # Asus after LGA1851
  #part_id = 322 # ASRock after Asus
  #part_id = 439 # Gigabyte after ASRock
  part_id = 562 # MSI after Gigabyte

  #motherboard_id = 50 # Asus after LGA1851
  #motherboard_id = 201 # ASRock after Asus
  #motherboard_id = 318 # Gigabyte after ASRock
  motherboard_id = 441 # MSI after Gigabyte

  #memory_speed_id = 768 # Asus after LGA1851
  #memory_speed_id = 2827 # ASRock after Asus 
  #memory_speed_id = 4127 # Gigabyte after ASRock
  memory_speed_id = 5893 # MSI after Gigabyte
  for mobo in motherboards:
    if (mobo.price and mobo.image):
      part_id += 1 
      #motherboard_id = len(motherboards_data) + 1 # Ran initially w/ 1851
      motherboard_id += 1
      time.sleep(random.uniform(7, 10))  
      mobo_product = scraper.fetch_product(mobo.url)
           
      # Handle price
      price = float(cpu.price.replace("$", ""))  
      
      # Prepare Part table data
      parts_data.append((
        part_id,
        mobo.name,
        mobo_product.type,
        mobo.image,
        price,
        mobo_product.specs.get('Manufacturer')[0],
        mobo_product.specs.get("Part #")[0],
        timestamp,
        timestamp
      ))

      # Prepare Motherboard table data
      specs = mobo_product.specs
      
      # Handle formFactor attribute
      form_factor = specs.get("Form Factor")[0]
      if form_factor == 'Micro ATX':
        form_factor = "MATX"
      elif form_factor == 'Mini ITX':
        form_factor = 'ITX'
      
      # Handle memoryMax attribute
      memory_max = 1234
      if specs.get("Memory Max") != None:
        memory_max = specs.get("Memory Max")[0].replace(" GB", "")
        int(memory_max)
        
      # Handle memorySlot attribute
      memory_slot = specs.get("Memory Slots", 0)
      if memory_slot != 0:
        memory_slot = int(specs.get("Memory Slots")[0])
      
      # Handle color attribute
      color = "Black"
      if specs.get("Color") != None:
        color = specs.get("Color")[0]
        
      # Handle PCIe slots and SATA slots
      pcie_x16 = 0 
      if specs.get("PCIe x16 Slots") != None:
        pcie_x16 = int(specs.get("PCIe x16 Slots")[0])
      
      pcie_x8 = 0
      if specs.get("PCIe x8 Slots") != None:
        pcie_x8 = int(specs.get("PCIe x8 Slots")[0])
        
      pcie_x4 = 0
      if specs.get("PCIe x4 Slots") != None:
        pcie_x4 = int(specs.get("PCIe x4 Slots")[0])
        
      pcie_x1 = 0
      if (specs.get("PCIe x1 Slots")) != None:
        pcie_x1 = int(specs.get("PCIe x1 Slots")[0])
        
      pci_slots = 0
      if specs.get("PCI Slots") != None:
        pci_slots = int(specs.get("PCI Slots")[0])
        
      sata_slots = 0
      if specs.get("SATA 6.0 Gb/s") != None:
        sata_slots = int(specs.get("SATA 6.0 Gb/s")[0])
      
      # Extract 'M.2 Slots' key from Product's .specs method/dictionary
      m_two_slots_raw = specs.get("M.2 Slots", [])
      # Count occurrences of '2280' and 'M-key' in each mobo entry
      m_two_slot_count = sum(1 for slot in m_two_slots_raw if '2280' in slot and 'M-key' in slot)
      
      # Handle onboardEthernet attribute
      onboard_ethernet = "None"
      if specs.get("Onboard Ethernet") != None:
        onboard_ethernet = specs.get("Onboard Ethernet")[0]
              
      # Handle onboardVideo attribute
      onboard_video = "None"
      if specs.get("Onboard Video") != None:
        onboard_video = specs.get("Onboard Video")[0]
        
      # Handle USB headers
      usb_2 = 0
      if specs.get("USB 2.0 Headers") != None:
        usb_2 = int(specs.get("USB 2.0 Headers")[0])
        
      usb_2_single = 0
      if specs.get("USB 2.0 Header (Single Port)") != None:
        usb_2_single = int(specs.get("USB 2.0 Header (Single Port)")[0])
        
      usb_3_gen_1 = 0
      if specs.get("USB 3.2 Gen 1 Headers") != None:
        usb_3_gen_1 = int(specs.get("USB 3.2 Gen 1 Headers")[0])
        
      usb_3_gen_2 = 0
      if specs.get("USB 3.2 Gen 2 Headers") != None:
        usb_3_gen_2 = int(specs.get("USB 3.2 Gen 1 Headers")[0])
        
      usb_3_gen_2x2 = 0
      if specs.get("USB 3.2 Gen 2x2 Headers") != None:
        usb_3_gen_2x2 = int(specs.get("USB 3.2 Gen 2x2 Headers")[0])
      
      # Handle wirelessNetworking attribute
      wireless_networking = "None"
      if specs.get("Wireless Networking") != None:
        wireless_networking = specs.get("Wireless Networking")[0]
      
      # Handle raidSupport tinyint attribute
      raid_support = 0
      if (specs.get("Raid Support") == 'Yes'):
        raid_support = 1
        
      # Handle backConnectors tinyint attribute
      back_conn = 0
      if (specs.get("Back Connectors" == 'Yes')):
        back_conn = 1
      
      motherboards_data.append((
        motherboard_id,
        part_id,
        specs.get("Socket / CPU")[0],
        form_factor,
        specs.get("Chipset")[0],
        memory_max,
        specs.get("Memory Type")[0],
        memory_slot,
        color,
        pcie_x16,
        pcie_x8,
        pcie_x4,
        pcie_x1,
        pci_slots,
        sata_slots,
        m_two_slot_count,
        onboard_ethernet,
        onboard_video,
        usb_2,
        usb_2_single,
        usb_3_gen_1,
        usb_3_gen_2,
        usb_3_gen_2x2,
        wireless_networking,
        raid_support,
        back_conn,
        timestamp,
        timestamp
      ))

      # Prepare Memory Speeds table data
      memory_speeds = specs.get("Memory Speed", [])
      for speed in memory_speeds:
        #memory_speed_id = len(memory_speeds_data) + 1
        memory_speed_id += 1
        memory_speeds_data.append((
          memory_speed_id,
          motherboard_id,
          speed,
          timestamp,
          timestamp
        )) 
      
      time.sleep(random.uniform(7, 10))
  return parts_data, motherboards_data, memory_speeds_data

def export_data_to_csv(parts_data, motherboards_data, memory_speeds_data):
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  # Part - All LGA1851 Motherboards
  # parts_file = f"Parts_LGA1851_{timestamp}.csv" # 50 parts 11/25/24
  
  # Part - Asus
  #parts_file = f"Parts_Asus_{timestamp}.csv"
  
  # Part - ASRock
  #parts_file = f"Parts_ASRock_{timestamp}.csv"
  
  # Part - Gigabyte
  #parts_file = f"Parts_Gigabyte_{timestamp}.csv"
  
  # Part - MSI
  parts_file = f"Parts_MSI_{timestamp}.csv"
  
  # Motherboard - LGA1851 (Asus, ASRock, Gigabyte, MSI)
  #motherboards_file = f"Motherboards_LGA1851_{timestamp}.csv"
  
  # Motherboard - Asus
  #motherboards_file = f"Motherboards_Asus_{timestamp}.csv"

  # Motherboard - ASRock
  #motherboards_file = f"Motherboards_ASRock_{timestamp}.csv"
  
  # Motherboard - Gigabyte
  #motherboards_file = f"Motherboards_Gigabyte_{timestamp}.csv"
  
  # Motherboard - MSI
  motherboards_file = f"Motherboards_MSI_{timestamp}.csv"
  
  # MotherboardMemorySpeed - LGA1851 (Asus, ASRock, Gigabyte, MSI)
  #memory_speeds_file = f"MotherboardMemorySpeeds_LGA1851_{timestamp}.csv"
  
  # MotherboardMemorySpeed - Asus
  #memory_speeds_file = f"MotherboardMemorySpeeds_Asus_{timestamp}.csv"
  
  # MotherboardMemorySpeed - ASRock
  #memory_speeds_file = f"MotherboardMemorySpeeds_ASRock_{timestamp}.csv"

  # MotherboardMemorySpeed - Gigabyte
  #memory_speeds_file = f"MotherboardMemorySpeeds_Gigabyte_{timestamp}.csv"

  # MotherboardMemorySpeed - MSI
  memory_speeds_file = f"MotherboardMemorySpeeds_MSI_{timestamp}.csv"
  
  with open(parts_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["partId", "name", "type", "image", "price", "manufacturer", "partNum", "createdAt", "updatedAt"])
    writer.writerows(parts_data)

  with open(motherboards_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["motherboardId", "partId", "socket", "formFactor", "chipset", "memoryMax", "memoryType", "memorySlot", "color", "pcieSixteenSlot", "pcieEightSlot", "pcieFourSlot", "pcieOneSlot", "pcieSlot", "sataSlot", "mTwoSlot", "onboardEthernet", "onboardVideo", "usbTwoHeader", "usbTwoHeaderSinglePort", "usbThreeTwoGenOneHeader", "usbThreeTwoGenTwoHeader", "usbThreeTwoGenTwoByTwoHeader", "wirelessNetworking", "raidSupport", "backConnectors", "createdAt", "updatedAt"])
    writer.writerows(motherboards_data)

  with open(memory_speeds_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["memorySpeedId", "motherboardId", "memorySpeed", "createdAt", "updatedAt"])
    writer.writerows(memory_speeds_data)

if __name__ == "__main__":
  motherboards = scrape_motherboards()
  parts_data, motherboards_data, memory_speeds_data = process_data(motherboards)
  export_data_to_csv(parts_data, motherboards_data, memory_speeds_data)