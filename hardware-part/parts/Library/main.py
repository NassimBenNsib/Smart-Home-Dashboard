from HardwareRoom import HardwareRoom
from MQTTBrokerRoom import MQTTBrokerRoom
from ProjectRoom import ProjectRoom

########################################################################
########                                                        ########
########                            Starting                    ########
########                                                        ########
########################################################################



######### General info
project_id = "b556606d67dd8c7cecfab843fecbe28c"
project_name = "Library"
topic_subscribe = project_id+"/projet-IoT-2022-2023/back-end/Rooms Details/"+project_name
topic_publish = project_id + "/projet-IoT-2022-2023/hardware/Rooms Details"


######### Configure of hardware part
hardware = HardwareRoom(
                dht_pin=18,
                lcd_pins=[4,5],
                air_conditioner_led_pin=23,
                music_led_pin=22,
                lights_led_pin=21,
                temperature_led_pin=19,
                ssid_wifi="Wokwi-GUEST",
                password_wifi=""
          )

######### Configure of broker part
mqtt_broker = MQTTBrokerRoom(
                client_id="ESP32-client",
                server="broker.emqx.io",
                port=1883,
                username="emqx",
                password="public",
                topic_publish=topic_publish,
                topic_subscribe=topic_subscribe,
              )

######### Configure of project
project = ProjectRoom(project_name,hardware,mqtt_broker)
project.start_project()