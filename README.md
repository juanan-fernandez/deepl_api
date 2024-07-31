# deepl_api

Api para la traducción de idiomas en samar.

    'CopiaTEXTO = QuitarAcentos(TEXTO) Si paso el texto en la url debo quitarle los acentos
    responseText = ""

    URL = "https://api.deepl.com/v2/translate?auth_key=" & authKey '& "&text=" & CopiaTEXTO & "&source_lang=es&target_lang=" & targetLang

    Set xmlHttp = CreateObject("Microsoft.XMLHTTP")
    xmlHttp.Open "POST", URL, False
    xmlHttp.setRequestHeader "Authorization", "DeepL-Auth-Key " & authKey
    xmlHttp.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
    xmlHttp.send "auth_key=" & authKey & "&text=" & TEXTO & "&source_lang=es&target_lang=" & targetLang

    If (xmlHttp.ReadyState = 4) Then
        responseText = xmlHttp.responseText
    Else
        responseText = xmlHttp.Status & " - " & xmlHttp.statusText
    End If
    Set xmlHttp = Nothing

    If InStr(responseText, "text") > 0 Then
        salida = DevolverCadEntre(responseText, Chr(34) & "text" & Chr(34) & ":", "}")
        salida = ReplaceStr(salida, Chr(34), "")
    Else
        RegistrarError "ERROR: en funcion TraducirApi: " & responseText, 999, , True
        salida = TEXTO
    End If

Exit_TERROR:
TraducirApi = salida
Exit Function
TERROR:
salida = TEXTO
DoCmd.Hourglass False
RegistrarError "ERROR: en traducirApi(): idioma:" & idioma & vbCrLf & Err.Description, Err.Number
Resume Exit_TERROR
End Function
