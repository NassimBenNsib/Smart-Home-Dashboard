import network
import time
from time import sleep_ms, ticks_ms
import ujson
import machine

########################################################################
########                                                        ########
########                    Class for All Project               ########
########                                                        ########
########################################################################
class ProjectDevices:
  '''
    Constructor
  '''
  def __init__(self,name,hardware,mqtt_broker):
    print("[Hardware-Devices] : Linking of parts ...")

    self.hardware = hardware
    self.mqtt_broker = mqtt_broker
    self.name = name
    print("[Hardware-Devices] : Subscribing to the topic ...")
    self.mqtt_broker.set_subscribing_handler(self.subscribing_handler)
    print("[Hardware-Devices] : Subscribing to the topic completed")
    
    print("[Hardware-Devices] : Linking of parts completed",end="\n\n")

  '''
    The handler of subscriptions
  '''
  def subscribing_handler(self,topic,message):
    try:
      print("[Hardware-Devices] : New update received :")
      status = ujson.loads(str(message.decode("utf8")).replace("'", '"'))
      print("=====>" + str(status))
      
      self.hardware.update_devices_status(
                          television_led_value = int(status["isTelevisionActive"]),
                          refrigerator_led_value= int(status["isRefrigeratorActive"]),
                          radio_led_value = int(status["isRadioActive"]),
                          lamps_outdoor_led_value = int(status["isLamps OutdoorActive"]),
                          fire_detection_led_value = int(status["isFire Detection SystemActive"]),
                          router_led_value = int(status["isRouterActive"]),
                          microwave_led_value = int(status["isMicrowaveActive"]),
                          anti_theft_led_value = int(status["isAnti Theft SystemActive"])
                     )

      print("[Hardware-Devices] : Devices status updated",end="\n\n")
    except Exception as e:
      print(e)
      print("[Hardware-Devices] : Wrong message format !!",end="\n\n")
      

  '''
    Starting project
  '''
  def start_project(self):
    try:
      print("=============================================================")
      print("==========================  Starting  =======================")
      print("=============================================================")
      message = {"messgae":"Give me news"}
      self.mqtt_broker.publish(ujson.dumps(message))
      
      while(True):
        self.mqtt_broker.check_message()
        time.sleep(1)

    except OSError as e:
      print("=============================================================")
      print("==========================  OS Error  =======================")
      print("=============================================================")
      print(e,end="\n\n")      
      print("=============================================================")
      print("==========================   Reset    =======================")
      print("=============================================================")
      time.sleep(5)
      machine.reset()
