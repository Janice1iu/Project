import xml.etree.ElementTree as ET

def print_venue_info(venue_ids):
    # Parse the venues XML file
    tree = ET.parse('venues.xml')
    root = tree.getroot()

    # Iterate over the provided venue IDs
    for venue_id in venue_ids:
        # Find the venue element with the matching ID
        for venue_element in root.findall('venue'):
            if venue_element.find('id').text == venue_id:
                venue_name_element_en = venue_element.find('venuee')
                venue_name_element_cn = venue_element.find('venuec')
                venue_name_en = venue_name_element_en.text if venue_name_element_en is not None else ""
                venue_name_cn = venue_name_element_cn.text if venue_name_element_cn is not None else ""
                location_element = venue_element.find('location')
                location = location_element.text if location_element is not None else ""

                print(f"Venue ID: {venue_id}")
                print(f"Venue Name (English): {venue_name_en}")
                print(f"Venue Name (Chinese): {venue_name_cn}")
                print(f"Location: {location}")
                print("---")
                break



venue_ids_to_retrieve = ['50110015', '6824', '87810779']
print_venue_info(venue_ids_to_retrieve)