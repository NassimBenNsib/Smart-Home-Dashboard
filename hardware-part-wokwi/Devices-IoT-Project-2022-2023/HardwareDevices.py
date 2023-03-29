import network
import time
from machine import Pin,SoftI2C,reset,Timer
import dht
import ujson
from time import sleep_ms, ticks_ms 
from i2c_lcd import I2cLcd 


########################################################################
########                                                        ########
########            Class for Hardware Configuration            ########
########                                                        ########
########################################################################
class HardwareDevices:
  '''
    Constructor
  '''
  def __init__(self,television_led_pin,refrigerator_led_pin,radio_led_pin,lamps_outdoor_led_pin,fire_detection_led_pin,router_led_pin,microwave_led_pin,anti_theft_led_pin,ssid_wifi,password_wifi):
    print("[Hardware-Devices] : Configuration of hardware part ...")
    
    # Leds
    print("[Hardware-Devices] : Configuration of leds pins ...")
    self.television_led = Pin(television_led_pin, mode=Pin.OUT, value=0)
    self.refrigerator_led = Pin(refrigerator_led_pin, mode=Pin.OUT, value=0)
    self.radio_led = Pin(radio_led_pin, mode=Pin.OUT, value=0)
    self.lamps_outdoor_led = Pin(lamps_outdoor_led_pin, mode=Pin.OUT, value=0)
    self.fire_detection_led = Pin(fire_detection_led_pin, mode=Pin.OUT, value=0)
    self.router_led = Pin(router_led_pin, mode=Pin.OUT, value=0)
    self.microwave_led = Pin(microwave_led_pin, mode=Pin.OUT, value=0)
    self.anti_theft_led = Pin(anti_theft_led_pin, mode=Pin.OUT, value=0)
  
    # Station Interface
    print("[Hardware-Devices] : Configuration of station interface ...",end="")
    self.station = network.WLAN(network.STA_IF)
    self.station.active(True)
    self.station.connect(ssid_wifi, password_wifi)
    while not self.station.isconnected():
      print(".",end="")
      time.sleep(1)
    time.sleep(1.5)

    print("\n[Hardware-Devices] : Configuration of hardware part completed",end="\n\n")

  '''
    Update the status of each device
  '''
  def update_devices_status(self,television_led_value,refrigerator_led_value,radio_led_value,lamps_outdoor_led_value,fire_detection_led_value,router_led_value,microwave_led_value,anti_theft_led_value):
    self.television_led.value(television_led_value)
    self.refrigerator_led.value(refrigerator_led_value)
    self.radio_led.value(radio_led_value)
    self.lamps_outdoor_led.value(lamps_outdoor_led_value) 
    self.fire_detection_led.value(fire_detection_led_value)
    self.router_led.value(router_led_value)
    self.microwave_led.value(microwave_led_value)
    self.anti_theft_led.value(anti_theft_led_value)

