import csv
import time
import random
from datetime import datetime
from pypartpicker import Scraper

# Initialize scraper
scraper = Scraper()

# scrape memory data from these manufacturers: [Corsair, G.Skill, Kingston, Crucial] w/ these memory types: [LGA1851, LGA1700, LGA1200, AM5, AM4]
def scrape_memory():
  # .part_search() to fetch Part objects of type 'Memory'
  # Corsair memory modules
  #memory = scraper.part_search('memory ddr5 corsair 2x32', limit=200, region='us')
  #memory = scraper.part_search('memory ddr4 corsair 2x16', limit=100, region='us')
  
  # G.Skill memory modules
  #memory = scraper.part_search('memory ddr5 g.skill 2x', limit=100, region='us')
  #memory = scraper.part_search('memory ddr4 g.skill 2x', limit=75, region='us')
  
  # Kingston memory modules
  #memory = scraper.part_search('memory ddr5 kingston 2x', limit=75, region='us')
  #memory = scraper.part_search('memory ddr4 kingston 2x', limit=75, region='us')
  
  # Crucial memory modules
  #memory = scraper.part_search('memory ddr5 crucial 2x', limit=31, region='us')
  #memory = scraper.part_search('memory ddr4 crucial 2x', limit=75, region='us')
  
  # Random delay to avoid rate limiting
  time.sleep(random.uniform(7, 10))
  return memory
  
def process_data(memory):
  # Initialize lists for each table
  parts_data = []
  memory_data = []

  timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      
  for ram in memory:
    if (ram.price and ram.image):
      part_id = len(parts_data) + 1
      memory_id = len(memory_data) + 1  
      memory_product = scraper.fetch_product(ram.url)
      time.sleep(random.uniform(7, 10))
      
      # Handle price
      price = float(ram.price.replace("$", ""))
        
      # Prepare Part table data
      parts_data.append((
        part_id,
        ram.name,
        memory_product.type,
        ram.image,
        price,
        memory_product.specs.get('Manufacturer')[0],
        memory_product.specs.get("Part #")[0],
        timestamp,
        timestamp
      ))

      # Prepare Motherboard table data
      specs = memory_product.specs
      
      # Alter 'Speed' key to fill memoryType and speed attributes
      memory_speed = specs.get("Speed")
      memory_type, speed = memory_speed[0].split("-")
      speed = int(speed)
      
      # Handler for CAS Latency
      cas_latency = int(specs.get("CAS Latency")[0])
      
      # Handler for trueLatency
      true_latency = float(specs.get("First Word Latency")[0].replace(" ns", ""))
      
      # Alter 'Modules' key to fill capacity and modules attributes
      memory_modules = specs.get("Modules")
      modules, capacity_per_module = memory_modules[0].split(" x ")
      modules = int(modules)
      capacity_per_module = int(capacity_per_module.replace("GB", ""))
      capacity = modules * capacity_per_module
      
      # Handle pricePerGig attribute from 'Price / GB'
      price_per_gig = float(specs.get("Price / GB")[0].replace("$", ""))
      
      # Handle voltage attribute from 'Voltage'
      voltage = float(specs.get("Voltage")[0].replace(" V", ""))
      # Alter 'Heat Spreader' key for tinyint() heatSpreader attribute
      heat_spreader = 0
      if (specs.get("Heat Spreader")[0] == 'Yes'):
        heat_spreader = 1
        
      memory_data.append((
        memory_id,
        part_id,
        memory_type,
        speed,
        cas_latency,
        true_latency,
        capacity,
        modules,
        price_per_gig,
        specs.get("Form Factor")[0],
        specs.get("Color", "Black"),
        voltage,
        heat_spreader,
        timestamp,
        timestamp
      ))
      
      time.sleep(random.uniform(7, 10))
  return parts_data, memory_data

def export_data_to_csv(parts_data, memory_data):
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  # Part - Corsair 
  #parts_file = f"Part_Corsair_DDR5_{timestamp}.csv"
  #parts_file = f"Part_Corsair_DDR4_{timestamp}.csv"
  
  # Part - G.Skill 
  #parts_file = f"Part_G.Skill_DDR5_{timestamp}.csv"
  #parts_file = f"Part_G.Skill_DDR4_{timestamp}.csv"
  
  # Part - Kingston 
  #parts_file = f"Part_Kingston_DDR5_{timestamp}.csv"
  #parts_file = f"Part_Kingston_DDR4_{timestamp}.csv"
  
  # Part - Crucial 
  #parts_file = f"Part_Crucial_DDR5_{timestamp}.csv"
  #parts_file = f"Part_Crucial_DDR4_{timestamp}.csv"
  
  # Memory - Corsair
  #memory_file = f"Memory_Corsair_DDR5_{timestamp}.csv"
  #memory_file = f"Memory_Corsair_DDR4_{timestamp}.csv"
  
  # Memory - G.Skill
  #memory_file = f"Memory_G.Skill_DDR5_{timestamp}.csv"
  #memory_file = f"Memory_G.Skill_DDR4_{timestamp}.csv"
  
  # Memory - Kingston
  #memory_file = f"Memory_Kingston_DDR5_{timestamp}.csv"
  #memory_file = f"Memory_Kingston_DDR4_{timestamp}.csv"
  
  # Memory - Crucial
  #memory_file = f"Memory_Crucial_DDR5_{timestamp}.csv"
  #memory_file = f"Memory_Crucial_DDR4_{timestamp}.csv"
  
  with open(parts_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["partId", "name", "type", "image", "price", "manufacturer", "partNum", "createdAt", "updatedAt"])
    writer.writerows(parts_data)

  with open(memory_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["memoryId", "partId", "memoryType", "speed", "casLatency", "trueLatency", "capacity", "modules", "pricePerGig", "formFactor", "color", "voltage", "heatSpreader", "createdAt", "updatedAt"])
    writer.writerows(memory_data)

if __name__ == "__main__":
  memory = scrape_memory()
  parts_data, memory_data = process_data(memory)
  export_data_to_csv(parts_data, memory_data)