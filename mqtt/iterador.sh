#!/bin/bash
echo "-----1------"
for (( n = 0; n < 5; ++n )); do
#genera un numero decimal aleatorio de 5 cifras
    randomDecimalNumber=`awk -v seed="$RANDOM" 'BEGIN { srand(seed); printf("%.5f\n", rand()) }'`
    pub=`mosquitto_pub -d -h localhost -p 1993 -t medicion/consumo -m "{\"device_name\":\"coc_1\", \"val\":$randomDecimalNumber}"`
    #detiene la ejecución durante el tiempo preestablecido
    sleep .2    
done 
