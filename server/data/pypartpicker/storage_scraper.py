import csv
import time
import random
from datetime import datetime
from pypartpicker import Scraper

# Initialize scraper
scraper = Scraper()

# scrape Storage data from Crucial, Samsung, Seagate, and Western Digital 
def scrape_storage():
  # .part_search() to fetch Part objects of type 'Storage'
  # M.2 PCIe 5.0 X4 (Crucial & Seagate)
  #storages = scraper.part_search('M.2 PCIe 5.0 X4 Crucial', limit=13, region='us')
  #storages += scraper.part_search('M.2 PCIe 5.0 X4 Seagate', limit=4, region='us')
  
  # M.2 PCIe 4.0 X4 (Crucial, Samsung, Seagate, & Western Digital)
  #storages = scraper.part_search('M.2 PCIe 4.0 X4 Crucial', limit=26, region='us')
  #storages += scraper.part_search('M.2 PCIe 4.0 X4 Samsung', limit=12, region='us')
  #storages = scraper.part_search('M.2 PCIe 4.0 X4 Seagate', limit=40, region='us')
  #storages += scraper.part_search('M.2 PCIe 4.0 X4 Western Digital', limit=40, region='us')
  
  # SATA 6.0 Gb/s (Crucial, Samsung, Seagate, & Western Digital)
  storages = scraper.part_search('sata 6.0 gb/s crucial', limit=7, region='us')
  storages += scraper.part_search('sata 6.0 gb/s samsung evo', limit=32, region='us')
  storages += scraper.part_search('sata 6.0 gb/s seagate', limit=100, region='us')
  storages += scraper.part_search('sata 6.0 gb/s western digital', limit=100, region='us')
  
  # Random delay to avoid rate limiting
  time.sleep(random.uniform(8, 11))
  return storages
  
def process_data(storages):
  # Initialize lists for each table
  parts_data = []
  storage_data = []
  timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      
  for storage in storages:
    if (storage.price and storage.image):

      part_id = len(parts_data) + 1
      storage_id = len(storage_data) + 1  
      storage_product = scraper.fetch_product(storage.url)
      time.sleep(random.uniform(8, 11))
      
      # Handle price
      price = float(storage.price.replace("$", ""))
        
      # Prepare Part table data
      parts_data.append((
        part_id,
        storage.name,
        storage_product.type,
        storage.image,
        price,
        storage_product.specs.get('Manufacturer')[0],
        storage_product.specs.get("Part #")[0],
        timestamp,
        timestamp
      ))

      # Prepare Motherboard table data
      specs = storage_product.specs
      
      # Handle Capacity
      capacity = specs.get("Capacity")[0]
      if "TB" in capacity:
        capacity = int(capacity.replace(" TB", "")) * 1000
      else:
        capacity = int(capacity.replace(" GB", ""))
      
      # Handle nvme attribute
      nvme = 0
      if specs.get("NVME")[0] != 'No':
        nvme = 1

      storage_data.append((
        storage_id,
        part_id,
        capacity,
        specs.get("Form Factor")[0],
        specs.get("Type")[0],
        float((specs.get("Price / GB")[0]).replace("$", "")),
        specs.get("Interface")[0],
        nvme,
        timestamp,
        timestamp
      ))
      
      time.sleep(random.uniform(8, 11))
  return parts_data, storage_data

def export_data_to_csv(parts_data, storage_data):
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  # Part - Storages (Crucial, Seagate, Samsung, and Western Digital
  #parts_file = f"Parts_M2_PCIe_5_x4_{timestamp}.csv"
  #parts_file = f"Parts_M2_PCIe_4_x4_{timestamp}.csv"
  parts_file = f"Part_SATA_{timestamp}.csv"
  
  # Storages - M.2 PCIe 5.0 x4, M.2 PCIe 4.0 x4, and SATA 6.0 Gb/s
  #storage_file = f"Storage_M2_PCIe_5_x4_{timestamp}.csv"
  #storage_file = f"Storage_M2_PCIe_4_x4_{timestamp}.csv"
  storage_file = f"Storage_SATA_{timestamp}.csv"
  
  with open(parts_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["partId", "name", "type", "image", "price", "manufacturer", "partNum", "createdAt", "updatedAt"])
    writer.writerows(parts_data)

  with open(storage_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["storageId", "partId", "capacity", "formFactor", "type", "pricePerGig", "interface", "nvme", "createdAt", "updatedAt"])
    writer.writerows(storage_data)

if __name__ == "__main__":
  storages = scrape_storage()
  parts_data, storage_data = process_data(storages)
  export_data_to_csv(parts_data, storage_data)