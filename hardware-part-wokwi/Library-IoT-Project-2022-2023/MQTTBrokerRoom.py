import network
import time
from machine import Pin,SoftI2C,reset,Timer
import dht
import ujson
from umqtt.simple import MQTTClient
from time import sleep_ms, ticks_ms 
from i2c_lcd import I2cLcd 

########################################################################
########                                                        ########
########             Class for Broker Configuration             ########
########                                                        ########
########################################################################
class MQTTBrokerRoom:
  '''
    Constructor
  '''
  def __init__(self,client_id,server,port,username,password,topic_publish,topic_subscribe):  
    print("[Hardware-Rooms] : Configuration of MQTT broker part ...")
    self.topic_publish = topic_publish
    self.topic_subscribe = topic_subscribe
    
    self.client = MQTTClient(client_id, server,port,username,password,keepalive=30)
    self.client.connect() 
    
    self.client.set_callback(lambda x,y : print("test"))
    self.client.subscribe(self.topic_subscribe)    
    
    tim1 = Timer(1)
    tim1.init(period=20000, mode=Timer.PERIODIC,callback=lambda n:self.client.ping())
    
    print("[Hardware-Rooms] : Configuration of MQTT broker part completed",end="\n\n")
  
  '''
    Set the handler of subscribtions
  '''
  def set_subscribing_handler(self,subscribing_handler):
    self.client.set_callback(subscribing_handler)  
  
  '''
    Publish message
  '''
  def publish(self,message):
    print("[Hardware-Rooms] : Publishing of message  : \n===>" + message)
    print(self.topic_publish)
    self.client.publish(self.topic_publish,message)
    print("[Hardware-Rooms] : Publishing of message completed",end="\n\n")
  
  '''
    Check message message
  '''
  def check_message(self):
    self.client.check_msg()
