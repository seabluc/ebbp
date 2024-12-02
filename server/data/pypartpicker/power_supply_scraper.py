import csv
import time
import random
from datetime import datetime
from pypartpicker import Scraper

# Initialize scraper
scraper = Scraper()

# scrape PSU data from Cooler Master, Corsair, EVGA, and Thermaltake 
def scrape_power_supply():
  # .part_search() to fetch Part objects of type 'Power Supply'
  # SFX
  #psu = scraper.part_search("80+ sfx cooler master", limit=5, region='us')
  #psu += scraper.part_search("80+ sfx corsair", limit=5, region='us')
  #psu += scraper.part_search("80+ sfx evga", limit=3, region='us')
  #psu += scraper.part_search("80+ sfx thermaltake", limit=6, region='us')
  
  # ATX
  psu = scraper.part_search("80+ atx cooler master", limit=40, region='us')
  psu += scraper.part_search("80+ atx corsair", limit=60, region='us')
  psu += scraper.part_search("80+ atx evga", limit=60, region='us')
  psu += scraper.part_search("80+ atx thermaltake", limit=60, region='us')
  
  # Random delay to avoid rate limiting
  time.sleep(random.uniform(8, 11))
  return psu
  
def process_data(power_supply_units):
  # Initialize lists for each table
  parts_data = []
  power_supply_data = []
  timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      
  for psu in power_supply_units:
    if (psu.price and psu.image):
      psu_product = scraper.fetch_product(psu.url)
      if psu_product.specs.get("Efficiency Rating") == None or psu_product.specs.get("Modular") == None:
        time.sleep(random.uniform(8, 11))
        continue
      part_id = len(parts_data) + 1
      psu_id = len(power_supply_data) + 1  
          
      # Handle price
      price = float(psu.price.replace("$", ""))
        
      # Prepare Part table data
      parts_data.append((
        part_id,
        psu.name,
        psu_product.type,
        psu.image,
        price,
        psu_product.specs.get('Manufacturer')[0],
        psu_product.specs.get("Part #")[0],
        timestamp,
        timestamp
      ))

      # Prepare PowerSupply table data
      specs = psu_product.specs
      
      # Handle formFactor attribute
      form_factor = specs.get("Type")[0]
      
      # Handle modularity attribute
      modularity = specs.get("Modular")[0]
      if modularity == 'Full':
        modularity = 'Fully Modular'
      elif modularity == 'Semi':
        modularity = 'Semi-Modular'
      elif modularity == 'No':
        modularity = 'Non-modular'
        
      # Handle length attribute
      length = 140
      if specs.get("Length") != None:
        length = specs.get("Length")[0].replace(" mm", "")
      
      # Handle color attribute
      color = 'Black'
      if specs.get("Color") != None:
        color = specs.get("Color")[0]
      
      power_supply_data.append((
        psu_id,
        part_id,
        form_factor,
        specs.get("Efficiency Rating")[0],
        modularity,
        int(specs.get("Wattage")[0].replace(" W", "")),
        length,
        color,
        int(specs.get("ATX 4-Pin Connectors")[0]),
        int(specs.get("EPS 8-Pin Connectors")[0]),
        int(specs.get("PCIe 12+4-Pin 12VHPWR Connectors")[0]),
        int(specs.get("PCIe 12-Pin Connectors")[0]),
        int(specs.get("PCIe 8-Pin Connectors")[0]),
        int(specs.get("PCIe 6+2-Pin Connectors")[0]),
        int(specs.get("PCIe 6-Pin Connectors")[0]),
        int(specs.get("SATA Connectors")[0]),
        int(specs.get("Molex 4-Pin Connectors")[0]),
        timestamp,
        timestamp
      ))
      
      time.sleep(random.uniform(8, 11))
  return parts_data, power_supply_data

def export_data_to_csv(parts_data, power_supply_data):
  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
  # Part - Power Supply Units (Cooler Master, Corsair, EVGA, and Thermaltake)
  #parts_file = f"Parts_SFX_PSU_{timestamp}.csv"
  parts_file = f"Parts_ATX_PSU_{timestamp}.csv"
  
  # Power Supply Units - ATX and SFX
  #power_supply_file = f"Power_Supply_SFX_{timestamp}.csv"
  power_supply_file = f"Power_Supply_ATX_{timestamp}.csv"
  
  with open(parts_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["partId", "name", "type", "image", "price", "manufacturer", "partNum", "createdAt", "updatedAt"])
    writer.writerows(parts_data)

  with open(power_supply_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["psuId", "partId", "formFactor", "efficiency", "modularity", "wattage", "length", "color", "atxFourConn", "epsEightConn", "pcieTwelvePlusFourConn", "pcieTwelveConn", "pcieEightConn", "pcieSixPlusTwoConn", "pcieSixConn", "sataConn", "molexFourConn", "createdAt", "updatedAt"])
    writer.writerows(power_supply_data)

if __name__ == "__main__":
  psu = scrape_power_supply()
  parts_data, power_supply_data = process_data(psu)
  export_data_to_csv(parts_data, power_supply_data)