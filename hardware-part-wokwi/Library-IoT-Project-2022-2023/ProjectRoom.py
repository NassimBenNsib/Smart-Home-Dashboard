import network
import time
from machine import Pin,SoftI2C,reset,Timer,reset
import dht
import ujson
from time import sleep_ms, ticks_ms 
from i2c_lcd import I2cLcd 


########################################################################
########                                                        ########
########            Class for Hardware Configuration            ########
########                                                        ########
########################################################################
class ProjectRoom:
  '''
    Constructor
  '''
  def __init__(self,name,hardware,mqtt_broker):
    print("[Hardware-Room] : Linking of parts ...")

    self.hardware = hardware
    self.mqtt_broker = mqtt_broker
    self.name = name
    print("[Hardware-Room] : Subscribing to the topic ...")
    self.mqtt_broker.set_subscribing_handler(self.subscribing_handler)
    print("[Hardware-Room] : Subscribing to the topic completed")
    
    print("[Hardware-Room] : Linking of parts completed",end="\n\n")

  '''
    The handler of subscriptions
  '''
  def subscribing_handler(self,topic,message):
    try:
      print("[Hardware-Room] : New update received :")
      status = ujson.loads(str(message.decode("utf8")).replace("'", '"'))

      print("=====>" + str(status))
      self.hardware.update_room_features_status(
                          air_conditioner_led_value = int(status["isAir ConditionerActive"]),
                          music_led_value= int(status["isMusicActive"]),
                          lights_led_value = int(status["isLightsActive"]),
                          temperature_led_value = int(status["isTemperatureActive"]),
                     )
      self.hardware.deviceTemperature = status["Device Temperature"]
      self.hardware.show_measuring_lcd()

      print("[Hardware-Room] : Room status updated",end="\n\n")
    except Exception as e:
      print(e)
      print("[Hardware-Room] : Wrong message format !!",end="\n\n")
      

  '''
    Starting project
  '''
  def start_project(self):
    try:
      print("=============================================================")
      print("==========================  Starting  =======================")
      print("=============================================================")
      prev_data = ""
      self.mqtt_broker.publish(ujson.dumps({
          "message" :"Give me news" ,
          "Room" : self.name
      }))
      
      while(True):
        self.mqtt_broker.check_message()
        temperature,humidity = self.hardware.get_dht_sensor_measuring()
        new_data = ujson.dumps({
          "Measured Temperature" :temperature ,
          "Measured Humidity" : humidity,
          "Room" : self.name
        })

        if(new_data != prev_data):
          prev_data = new_data
          self.hardware.show_measuring_lcd()
          self.mqtt_broker.publish(ujson.dumps(new_data))

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
      reset()
