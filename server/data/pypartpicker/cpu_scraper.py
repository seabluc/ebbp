import csv
import time
import random
from datetime import datetime
from pypartpicker import Scraper

# Initialize scraper
scraper = Scraper()

# scrape CPU data from AMD and Intel. (nobody else making CPUs lol)
def scrape_cpu():
  # .part_search() to fetch Part objects of type 'CPU'
  # Intel CPUs
  #processors = scraper.part_search('intel core ultra', limit=5, region='us') 
  #processors += scraper.part_search('intel core i9-1', limit=30, region='us') 
  #processors += scraper.part_search('intel core i7-1', limit=20, region="us") 
  #processors += scraper.part_search('intel core i5-1', limit=30, region='us') 
  #processors += scraper.part_search('intel core i3-1', limit=17, region='us')  
  
  # AMD CPUs
  #processors = scraper.part_search('amd ryzen 9', limit=20, region='us')
  #processors = scraper.part_search('amd ryzen 7', limit=50, region='us')
  #processors = scraper.part_search('amd ryzen 5', limit=60, region='us')
  processors = scraper.part_search('amd ryzen 3', limit=40, region='us')
  
  # Random delay to avoid rate limiting
  time.sleep(random.uniform(8, 11))
  return processors
  
def process_data(processors):
  # Initialize lists for each table
  parts_data = []
  cpu_data = []

  timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      
  for cpu in processors:
    if (cpu.price and cpu.image):
      # Intel socket check
      #cpu_socket = (scraper.fetch_product(cpu.url)).specs.get("Socket")
      #if cpu_socket[0] != 'LGA1851' and cpu_socket[0] != 'LGA1700':
        #time.sleep(random.uniform(9, 11))
        #continue
      
      # AMD series check
      cpu_series = (scraper.fetch_product(cpu.url)).specs.get("Series")
      #if cpu_series[0] != 'AMD Ryzen 9':
        #time.sleep(random.uniform(9, 11))
        #continue
      #if cpu_series[0] != 'AMD Ryzen 7':
        #time.sleep(random.uniform(9, 11))
        #continue
      #if cpu_series[0] != 'AMD Ryzen 5':
        #time.sleep(random.uniform(9, 11))
        #continue
      if cpu_series[0] != 'AMD Ryzen 3':
        time.sleep(random.uniform(9, 11))
        continue
      
      part_id = len(parts_data) + 1
      cpu_id = len(cpu_data) + 1  
      cpu_product = scraper.fetch_product(cpu.url)
      time.sleep(random.uniform(8, 11))
      
      # Handle price
      price = float(cpu.price.replace("$", ""))
        
      # Prepare Part table data
      parts_data.append((
        part_id,
        cpu.name,
        cpu_product.type,
        cpu.image,
        price,
        cpu_product.specs.get('Manufacturer')[0],
        cpu_product.specs.get("Part #")[0],
        timestamp,
        timestamp
      ))

      # Prepare Motherboard table data
      specs = cpu_product.specs
      
      # Handle E.Core Base Clock
      e_core_base = None
      #if specs.get("Manufacturer")[0] == 'Intel':
      if specs.get("Efficiency Core Clock") != None:
        e_core_base = specs.get("Efficiency Core Clock")[0].replace(" GHz", "")
      
      # Handle E.Core Boost Clock
      e_core_boost = None
      #if specs.get("Manufacturer")[0] == 'Intel':
      if specs.get("Efficiency Core Boost Clock") != None:
        e_core_boost = specs.get("Efficiency Core Boost Clock")[0].replace(" GHz", "")
      
      # Handle L3 Cache
      l_three_cache = None
      if specs.get("L3 Cache") != None:
        l_three_cache = specs.get("L3 Cache")[0].replace(" MB", "")
      
      # Handle maxTurboPower
      max_turbo_power = None
      if specs.get("Manufacturer")[0] == 'Intel':
        max_turbo_power = 250
      
      # Handle maxMemory attribute
      max_memory = 'tbd'
      if specs.get("Maximum Supported Memory") != None:
        max_memory = specs.get("Maximum Supported Memory")[0].replace(" GB", "")
        
      # Handle includedCooler attribute
      included_cooler = 0
      included_cpu_cooler = specs.get("Includes CPU Cooler")[0]
      if included_cpu_cooler == 'Yes':
        included_cooler = 1
      
      # Handle multiThreading attribute
      multithreading = 0
      if specs.get("Simultaneous Multithreading")[0] != 'No':
        multithreading = 1

      cpu_data.append((
        cpu_id,
        part_id,
        specs.get("Series")[0],
        specs.get("Microarchitecture")[0],
        specs.get("Core Family")[0],
        specs.get("Socket")[0],
        specs.get("Core Count")[0],
        specs.get("Thread Count")[0],
        specs.get("Performance Core Clock")[0].replace(" GHz", ""),
        specs.get("Performance Core Boost Clock")[0].replace(" GHz", ""),
        e_core_base,
        e_core_boost,
        specs.get("L2 Cache")[0].replace(" MB", ""),
        l_three_cache,
        specs.get("TDP")[0].replace(" W", ""),
        max_turbo_power,
        specs.get("Integrated Graphics")[0],
        max_memory,
        specs.get("Lithography")[0].replace(" nm", ""), 
        included_cooler,
        multithreading,
        timestamp,
        timestamp
      ))
      
      time.sleep(random.uniform(8, 11))
  return parts_data, cpu_data

def export_data_to_csv(parts_data, cpu_data):
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  # Part - Intel and AMD
  #parts_file = f"Parts_Intel_Core_{timestamp}.csv"
  #parts_file = f"Part_AMD_Ryzen_9_{timestamp}.csv"
  #parts_file = f"Part_AMD_Ryzen_7_{timestamp}.csv"
  #parts_file = f"Part_AMD_Ryzen_5_{timestamp}.csv"
  parts_file = f"Part_AMD_Ryzen_3_{timestamp}.csv"
  
  # CPU - Intel and AMD
  #cpu_file = f"CPU_Intel_Core_{timestamp}.csv"
  #cpu_file = f"CPU_AMD_Ryzen_9_{timestamp}.csv"
  #cpu_file = f"CPU_AMD_Ryzen_7_{timestamp}.csv"
  #cpu_file = f"CPU_AMD_Ryzen_5_{timestamp}.csv"
  cpu_file = f"CPU_AMD_Ryzen_3_{timestamp}.csv"
  
  with open(parts_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["partId", "name", "type", "image", "price", "manufacturer", "partNum", "createdAt", "updatedAt"])
    writer.writerows(parts_data)

  with open(cpu_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["cpuId", "partId", "series", "microarchitecture", "coreFamily", "socket", "coreCount", "threadCount", "performanceCoreClock", "performanceCoreBoostClock", "efficiencyCoreClock", "efficiencyCoreBoostClock", "lTwoCache", "lThreeCache", "tdp", "maxTurboPower", "integrated", "memoryMax", "lithography", "includedCooler", "multithreading", "createdAt", "updatedAt"])
    writer.writerows(cpu_data)

if __name__ == "__main__":
  processors = scrape_cpu()
  parts_data, cpu_data = process_data(processors)
  export_data_to_csv(parts_data, cpu_data)