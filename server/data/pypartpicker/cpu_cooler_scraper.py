import csv
import time
import random
from datetime import datetime
from pypartpicker import Scraper

# Initialize scraper
scraper = Scraper()

# scrape CPU Cooler data from be quiet!, Cooler Master, Corsair, and Noctua
def scrape_cpu_cooler():
  # .part_search() to fetch Part objects of type 'CPU Cooler'
  cooler = scraper.part_search("CPU Cooler be quiet!", limit=43, region='us')
  time.sleep(random.uniform(8, 11))
  cooler += scraper.part_search("CPU Cooler Cooler Master", limit=89, region='us')
  time.sleep(random.uniform(8, 11))
  cooler += scraper.part_search("CPU Cooler Corsair", limit=72, region='us')
  time.sleep(random.uniform(8, 11))
  cooler += scraper.part_search("CPU Cooler Noctua", limit=43, region='us')
  
  # Random delay to avoid rate limiting
  time.sleep(random.uniform(8, 11))
  return cooler
  
def process_data(cpu_coolers):
  # Initialize lists for each table
  parts_data = []
  cpu_cooler_data = []
  cooler_socket_data = []
  timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
  part_id = 1757
  
  for coolers in cpu_coolers:
    if coolers.price and coolers.image:
      cooler_product = scraper.fetch_product(coolers.url)
      cooler_sockets = cooler_product.specs.get("CPU Socket")
      # Exclude CPU Coolers that do not support at least one of these sockets: LGA1851, LGA1700, AM5, AM4
      if not any(socket in cooler_sockets for socket in ['LGA1851', 'LGA1700', 'AM5', 'AM4']):
        time.sleep(random.uniform(8, 11))
        continue
      else:
        supported_sockets = [socket for socket in cooler_sockets if socket in ['LGA1851', 'LGA1700', 'AM5', 'AM4']]
      
      # Exclude CPU Coolers that do not have a Fan RPM value
      cooler_fan_rpm = cooler_product.specs.get("Fan RPM")
      if cooler_fan_rpm == None:
        time.sleep(random.uniform(8, 11))
        continue
      else:
        cooler_fan_rpm = cooler_product.specs.get("Fan RPM")[0]
        if " - " in cooler_fan_rpm:
          cooler_fan_rpm = int(cooler_fan_rpm.split(" - ")[1].replace(" RPM", ""))
        else:
          cooler_fan_rpm = int(cooler_fan_rpm.replace(" RPM", ""))
          
      # Exclude CPU Coolers that do not have a Noise Level value
      noise_level = cooler_product.specs.get("Noise Level")
      if noise_level == None:
        time.sleep(random.uniform(8, 11))
        continue
      else:
        noise_level = cooler_product.specs.get("Noise Level")[0]
        if " - " in noise_level:
          noise_level = float(noise_level.split(" - ")[1].replace(" dB", ""))
        else:
          noise_level = float(noise_level.replace(" dB", ""))
      part_id += 1
      cpu_cooler_id = len(cpu_cooler_data) + 1  
      cooler_socket_id = len(cooler_socket_data) + 1
      
      # Handle price
      price = float(coolers.price.replace("$", ""))
        
      # Prepare Part table data
      parts_data.append((
        part_id,
        coolers.name,
        cooler_product.type,
        coolers.image,
        price,
        cooler_product.specs.get('Manufacturer')[0],
        cooler_product.specs.get("Part #")[0],
        timestamp,
        timestamp
      ))

      # Prepare CpuCooler table data
      specs = cooler_product.specs
        
      # Handle color attribute
      color = 'N/A'
      if specs.get("Color") != None:
        color = specs.get("Color")[0]
      
      # Handle height attribute
      height = None
      if specs.get("Height") != None:
        height = int(specs.get("Height")[0].replace(" mm", ""))
      
      # Handle radiatorSize attribute
      radiator_size = None
      if specs.get("Water Cooled") and specs.get("Water Cooled")[0] != 'No':
        radiator_size = specs.get("Water Cooled")[0]
        radiator_size = int(radiator_size.split(" - ")[1].replace(" mm", ""))
      
      cpu_cooler_data.append((
        cpu_cooler_id,
        part_id,
        cooler_fan_rpm,
        noise_level,
        color,
        height,
        radiator_size,
        timestamp,
        timestamp
      ))
      
      #CpuCoolerSocket Table
      for sockets in supported_sockets:
        cooler_socket_data.append((
          cooler_socket_id,
          cpu_cooler_id,
          sockets,
          timestamp,
          timestamp
        )) 
        
      time.sleep(random.uniform(7, 10))
  return parts_data, cpu_cooler_data, cooler_socket_data

def export_data_to_csv(parts_data, cpu_cooler_data, cooler_socket_data):
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  # Part - CPU Coolers (be quiet!, Cooler Master, Corsair, and Noctua)
  parts_file = f"Parts_CPU_Cooler_{timestamp}.csv"
  
  # CPU Coolers - Air Coolers and AIO
  cpu_cooler_file = f"CPU_Cooler_{timestamp}.csv"
  
  # CPU Cooler's supported sockets
  cooler_socket_file = f"CPU_Cooler_Sockets_{timestamp}.csv"
  
  with open(parts_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["partId", "name", "type", "image", "price", "manufacturer", "partNum", "createdAt", "updatedAt"])
    writer.writerows(parts_data)

  with open(cpu_cooler_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["cpuCoolerId", "partId", "fanRPM", "noiseLevel", "color", "height", "radiatorSize", "createdAt", "updatedAt"])
    writer.writerows(cpu_cooler_data)
    
  with open(cooler_socket_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["coolerSocketId, cpuCoolerId, socket, createdAt, updatedAt"])
    writer.writerows(cooler_socket_data)

if __name__ == "__main__":
  cpu_coolers = scrape_cpu_cooler()
  parts_data, cpu_cooler_data, cooler_socket_data = process_data(cpu_coolers)
  export_data_to_csv(parts_data, cpu_cooler_data, cooler_socket_data)