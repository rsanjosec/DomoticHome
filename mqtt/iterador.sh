#!/bin/bash

#    DEFINICIÓN DE CONSTANTES DE COLOR
RED='\033[0;31m'
GREEN='\033[0;32m'
LIGHTGREEN='\033[1;32m'
BLUE='\033[0;34m'
LIGHTBLUE='\033[1;34m'
NC='\033[0m' # No Color

#    DEFINICIÓN DE VARIABLES
nIter=5000
nTime=1

if [ "$1" != "" ]; then
    printf "\n${LIGHTGREEN}**********************************************************\n"
    printf "${NC}Script que emula la salidad datos de un microcontrolador\n"
    echo "***** Itera $nIter veces,  cada $nTime seg sobre el dispositivo $1 *****"
    printf "${GREEN}Registrando datos.......\n${NC}"

    for (( n = 0; n < $nIter; ++n )); do
    #genera un numero decimal aleatorio de 5 cifras
        randomDecimalNumber=`awk -v seed="$RANDOM" 'BEGIN { srand(seed); printf("%.5f\n", rand()) }'`    
        pub=`mosquitto_pub -d -h localhost -p 1993 -t medicion/consumo -m "{\"device_name\":\"$1\", \"val\":$randomDecimalNumber}"`
        # echo $pub
        #detiene la ejecución durante el tiempo preestablecido
        #sleep .5
        sleep $nTime
    done
    printf "\n${GREEN}********* fin de la iteración *********\n"
    printf "**********************************************************\n"
    printf "${NC}"
else
    echo "de debe de suministrar un parámetro con el nombre des dispositivo a ingresar"
fi

