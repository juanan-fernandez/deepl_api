# deepl_api

Api para la traducción de idiomas en samar.

Function TraducirApi(TEXTO As String, Optional Idioma = "ESP") As String
On Error GoTo TERROR
Dim salida As String, targetLang As String, URL As String, authKey As String, responseText As String, CopiaTEXTO As String
Dim ipServer As String

    Dim xmlHttp As Object
    Dim lResolve As Long, lConnect As Long, lSend As Long, lReceive As Long
    Dim encodedText As String

    lResolve = 10 * 1000
    lConnect = 10 * 1000
    lSend = 10 * 1000
    lReceive = 10 * 1000

    If Idioma = "ESP" Then targetLang = "es"
    If Idioma = "ENG" Then targetLang = "en"
    If Idioma = "ITA" Then targetLang = "it"
    If Idioma = "DEU" Then targetLang = "de"
    If Idioma = "FRA" Then targetLang = "fr"
    If Idioma = "POR" Then targetLang = "pt"


    responseText = ""
    ipServer = "192.168.0.130:3001"

    encodedText = EncodeURLString(TEXTO)


    URL = "http://" & ipServer & "/api/v1/" & encodedText & "/" & targetLang
    Set xmlHttp = CreateObject("Microsoft.XMLHTTP")
    xmlHttp.Open "get", URL, False
    xmlHttp.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
    xmlHttp.send

    If (xmlHttp.ReadyState = 4) Then
        responseText = xmlHttp.responseText
    Else
        responseText = xmlHttp.STATUS & " - " & xmlHttp.statusText
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
RegistrarError "ERROR: en TraducirApi(): idioma:" & Idioma & vbCrLf & Err.Description, Err.Number
Resume Exit_TERROR
End Function
