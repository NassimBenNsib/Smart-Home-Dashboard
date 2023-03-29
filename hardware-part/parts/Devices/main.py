from HardwareDevices import HardwareDevices
from MQTTBrokerDevices import MQTTBrokerDevices
from ProjectDevices import ProjectDevices

########################################################################
########                                                        ########
########                            Starting                    ########
########                                                        ########
########################################################################



######### General info
project_id = "b556606d67dd8c7cecfab843fecbe28c"
project_name = "Devices Details"
topic_subscribe = project_id+"/projet-IoT-2022-2023/back-end/"+project_name
topic_publish = project_id + "/projet-IoT-2022-2023/hardware/"+project_name


######### Configure of hardware part
hardware = HardwareDevices(
                television_led_pin=23,
                refrigerator_led_pin=22,
                radio_led_pin=21,
                lamps_outdoor_led_pin=19,
                fire_detection_led_pin=5,
                router_led_pin=4,
                microwave_led_pin=2,
                anti_theft_led_pin=15,
                ssid_wifi="Wokwi-GUEST",
                password_wifi=""
          )

######### Configure of broker part
mqtt_broker = MQTTBrokerDevices(
                client_id="ESP32-client",
                server="broker.emqx.io",
                port=1883,
                username="emqx",
                password="public",
                topic_publish=topic_publish,
                topic_subscribe=topic_subscribe,
              )

######### Configure of project
project = ProjectDevices(project_name,hardware,mqtt_broker)
project.start_project()