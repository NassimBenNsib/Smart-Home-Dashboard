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
class HardwareRoom:
  '''
    Constructor
  '''
  def __init__(self,dht_pin,lcd_pins,air_conditioner_led_pin,music_led_pin,lights_led_pin,temperature_led_pin,ssid_wifi,password_wifi):
    print("[Hardware-Room] : Configuration of hardware part ...")
    
    self.deviceTemperature = 0
    # LCD
    print("[Hardware-Room] : Configuration of LCD ...")
    i2c = SoftI2C(scl=Pin(lcd_pins[0]), sda=Pin(lcd_pins[1]),freq=100000)
    self.lcd = I2cLcd(i2c, 0x27,4,20)
    time.sleep(2)
    self.lcd.clear()

    # DHT22
    print("[Hardware-Room] : Configuration of DHT22 sensor ...")
    self.dht_sensor = dht.DHT22(Pin(dht_pin))   
    
    # Leds
    print("[Hardware-Room] : Configuration of leds pins ...")
    self.air_conditioner_led = Pin(air_conditioner_led_pin, mode=Pin.OUT, value=0)
    self.music_led = Pin(music_led_pin, mode=Pin.OUT, value=0)
    self.lights_led = Pin(lights_led_pin, mode=Pin.OUT, value=1)
    self.temperature_led = Pin(temperature_led_pin, mode=Pin.OUT, value=1)
  
    # Station Interface
    print("[Hardware-Room] : Configuration of station interface ...",end="")
    content = "Connecting to WiFi..."
    self.change_lcd_content(content)
    self.station = network.WLAN(network.STA_IF)
    self.station.active(True)
    self.station.connect(ssid_wifi, password_wifi)
    while not self.station.isconnected():
      print(".",end="")
      self.change_lcd_content(content)
      time.sleep(1)
    self.change_lcd_content("Connected")
    time.sleep(1.5)

    print("\n[Hardware-Room] : Configuration of hardware part completed",end="\n\n")

  '''
    To change the content of the LCD
  '''
  def change_lcd_content(self,content):
    self.lcd.clear()
    self.lcd.putstr(content)

  '''
    To read temperature & humidity from the dht22 sensor
  '''
  def get_dht_sensor_measuring(self):
    self.dht_sensor.measure()
    temperature = self.dht_sensor.temperature()
    humidity = self.dht_sensor.humidity()
    if(isinstance(temperature,float) and isinstance(humidity,float)):
      return [temperature,humidity]
    else: 
      raise Exception("Problem when reading values from DHT22")

  '''
    Update the status of each device
  '''
  def update_room_features_status(self,air_conditioner_led_value,music_led_value,lights_led_value,temperature_led_value):
    self.air_conditioner_led.value(air_conditioner_led_value)
    self.music_led.value(music_led_value)
    self.lights_led.value(lights_led_value)
    self.temperature_led.value(temperature_led_value) 


  '''
    To show temperaure & humidity in LCD
  '''
  def show_measuring_lcd(self):
    temperature,humidity = self.get_dht_sensor_measuring()

    if(self.temperature_led.value()==1 or self.air_conditioner_led.value()==1):
      temperature = self.deviceTemperature

    self.lcd.clear()
    t = 'Temp: {:4.2f} °C'.format(temperature)
    l = 40 - len(t)
    self.lcd.putstr(t+" "*l)
    self.lcd.putstr('Humidity: {:5.2f} %'.format(humidity))

