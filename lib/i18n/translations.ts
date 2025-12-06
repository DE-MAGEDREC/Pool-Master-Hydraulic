export type Language = "fr" | "en" | "es" | "pt"

export const translations = {
  fr: {
    // App name
    appName: "Pool Master Calculation",
    appDescription: "Calculateur hydraulique professionnel pour piscines",

    // Navigation
    login: "Se connecter",
    signUp: "S'inscrire",
    logout: "Se déconnecter",

    // Home page
    homeTitle: "Calculateur hydraulique professionnel pour piscines",
    preciseCalculations: "Calculs hydrauliques précis",
    preciseCalculationsDesc: "Équations de Darcy-Weisbach avec facteur de friction Swamee-Jain",
    projectManagement: "Gestion de projets",
    projectManagementDesc: "Sauvegardez et gérez vos calculs",
    calcSurface: "Calcul de surface et volume",
    filtrationFlow: "Débit de filtration optimal",
    headLoss: "Pertes de charge linéaires et singulières",
    tdhPressure: "TDH et pression au filtre",
    secureAccount: "Compte utilisateur sécurisé",
    unlimitedProjects: "Sauvegarde illimitée de projets",
    accessAnywhere: "Accès depuis n'importe quel appareil",
    exportResults: "Exportation des résultats",
    mobileOptimized: "Optimisé pour mobile",
    mobileOptimizedDesc: "Utilisable sur chantier avec votre smartphone ou tablette",

    // Auth pages
    loginTitle: "Connexion",
    loginDescription: "Entrez vos identifiants pour accéder à l'application",
    signUpTitle: "Créer un compte",
    signUpDescription: "Créez votre compte pour commencer",
    email: "Email",
    password: "Mot de passe",
    connecting: "Connexion...",
    signUpAction: "S'inscrire",
    noAccount: "Pas encore de compte ?",
    hasAccount: "Vous avez déjà un compte ?",

    // Calculator
    calculatorTitle: "Calculateur hydraulique - Piscine",

    // Section 1: Pool shape
    section1Title: "Choix de la forme (avec dessins)",
    rectangular: "Rectangulaire",
    round: "Ronde",
    oval: "Ovale",
    length: "Longueur (m)",
    width: "Largeur (m)",
    diameter: "Diamètre (m)",
    avgDepth: "Profondeur moyenne (m)",
    surface: "Surface",
    volume: "Volume",

    // Section 2: Filtration
    section2Title: "Filtration (durée modifiable)",
    renewalDuration: "Durée de renouvellement (h, défaut 5)",
    recommendedFlow: "Débit recommandé",

    // Section 3: Fittings
    section3Title: "Choix des pièces à sceller (avec dessins)",
    skimmer: "Skimmer",
    return: "Refoulement",
    mainDrain: "Bonde de fond",
    skimmers: "Skimmers",
    returns: "Refoulements",
    mainDrains: "Bonde(s) de fond",

    // Section 4: Pipe material
    section4Title: "Type de tuyau",
    flexiblePipe: "Tuyau souple piscine",
    rigidPvcPn10: "PVC rigide pression PN10",
    rigidPvcPn16: "PVC rigide pression PN16",
    polyethylene: "Polyéthylène (PE)",

    // Section 5: Pipe diameter
    section5Title: "Diamètre des tuyaux",
    dnSuction: "DN aspiration",
    dnReturn: "DN refoulement",

    // Section 6: Water velocity
    section6Title: "Vitesse de passage de l'eau",
    section6Description: "Définissez les vitesses cibles de passage de l'eau.",
    velocitySuction: "Vitesse aspiration (m/s)",
    velocityReturn: "Vitesse refoulement (m/s)",
    actualVelocities: "Vitesses réelles calculées: Aspiration",

    // Section 7: Filter loss
    section7Title: "Pertes de charge du filtre",
    section7Description: "Indiquez la perte de charge nominale fournie par le fabricant (en mCE).",

    // Section 8: Hydraulic parameters
    section8Title: "Paramètres hydrauliques",
    totalLengthSuction: "Longueur totale aspiration (m)",
    totalLengthReturn: "Longueur totale refoulement (m)",
    heightDiff: "Différence hauteur (m)",

    // Section 9: Results
    section9Title: "Résultats hydrauliques",
    totalTDH: "Perte totale TDH",
    filterPressure: "Pression au filtre",
    linearLossSuction: "Pertes linéaires aspiration",
    singularLossSuction: "Pertes singulières aspiration",
    linearLossReturn: "Pertes linéaires refoulement",
    singularLossReturn: "Pertes singulières refoulement",

    // Section 10: Cavitation Analysis
    section10Title: "Analyse de la cavitation (NPSH)",
    section10Description:
      "Le NPSH (Net Positive Suction Head) détermine si la pompe risque de caviter. La cavitation endommage gravement la pompe.",
    altitude: "Altitude du site (m)",
    waterTemp: "Température de l'eau (°C)",
    staticHeight: "Hauteur statique (m) - Niveau d'eau au-dessus (+) ou en-dessous (-) de la pompe",
    npshRequired: "NPSH requis de la pompe (m) - Voir documentation fabricant",
    atmosphericPressure: "Pression atmosphérique",
    vaporPressure: "Tension de vapeur de l'eau",
    npshAvailable: "NPSH disponible",
    cavitationMargin: "Marge de sécurité",
    cavitationWarning: "⚠️ Risque de cavitation détecté !",
    cavitationWarningText:
      "Le NPSH disponible est inférieur au NPSH requis. La pompe va caviter, ce qui causera du bruit, des vibrations et endommagera la pompe. Réduisez les pertes de charge en aspiration, augmentez le diamètre des tuyaux d'aspiration, ou installez la pompe plus bas.",
    cavitationOK: "✅ Aucun risque de cavitation",
    cavitationOKText: "Le NPSH disponible est suffisant. La pompe fonctionnera sans cavitation.",

    // Disclaimer translations
    disclaimer: "Avertissement Important",
    disclaimerText:
      "Ce calcul est une approche approximative basée sur les données fournies. Les résultats ne sont pas validés et ne doivent servir que comme estimation préliminaire. Ce calcul ne tient pas compte de nombreux éléments tels que le nombre de coudes, dérivations, tés, réductions, vannes, et autres singularités du circuit hydraulique. Pour un dimensionnement précis et conforme aux normes, veuillez consulter un professionnel qualifié.",

    // Unit labels
    barUnit: "bar",
    mceUnit: "mCE",

    // PDF export translations
    downloadPDF: "Télécharger PDF",
    sendEmail: "Envoyer par email",
    generating: "Génération...",
    sending: "Envoi...",
    emailSent: "Email envoyé avec succès à",
    emailError: "Erreur lors de l'envoi de l'email",
    pdfError: "Erreur lors de la génération du PDF",
  },
  en: {
    // App name
    appName: "Pool Master Calculation",
    appDescription: "Professional hydraulic calculator for pools",

    // Navigation
    login: "Login",
    signUp: "Sign Up",
    logout: "Logout",

    // Home page
    homeTitle: "Professional hydraulic calculator for pools",
    preciseCalculations: "Precise hydraulic calculations",
    preciseCalculationsDesc: "Darcy-Weisbach equations with Swamee-Jain friction factor",
    projectManagement: "Project management",
    projectManagementDesc: "Save and manage your calculations",
    calcSurface: "Surface and volume calculation",
    filtrationFlow: "Optimal filtration flow",
    headLoss: "Linear and singular head losses",
    tdhPressure: "TDH and filter pressure",
    secureAccount: "Secure user account",
    unlimitedProjects: "Unlimited project storage",
    accessAnywhere: "Access from any device",
    exportResults: "Export results",
    mobileOptimized: "Mobile optimized",
    mobileOptimizedDesc: "Usable on-site with your smartphone or tablet",

    // Auth pages
    loginTitle: "Login",
    loginDescription: "Enter your credentials to access the application",
    signUpTitle: "Create an account",
    signUpDescription: "Create your account to get started",
    email: "Email",
    password: "Password",
    connecting: "Connecting...",
    signUpAction: "Sign Up",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",

    // Calculator
    calculatorTitle: "Hydraulic Calculator - Pool",

    // Section 1: Pool shape
    section1Title: "Choose shape (with drawings)",
    rectangular: "Rectangular",
    round: "Round",
    oval: "Oval",
    length: "Length (m)",
    width: "Width (m)",
    diameter: "Diameter (m)",
    avgDepth: "Average depth (m)",
    surface: "Surface",
    volume: "Volume",

    // Section 2: Filtration
    section2Title: "Filtration (adjustable duration)",
    renewalDuration: "Turnover time (h, default 5)",
    recommendedFlow: "Recommended flow",

    // Section 3: Fittings
    section3Title: "Choose pool fittings (with drawings)",
    skimmer: "Skimmer",
    return: "Return",
    mainDrain: "Main drain",
    skimmers: "Skimmers",
    returns: "Returns",
    mainDrains: "Main drain(s)",

    // Section 4: Pipe material
    section4Title: "Pipe type",
    flexiblePipe: "Flexible pool pipe",
    rigidPvcPn10: "Rigid PVC pressure PN10",
    rigidPvcPn16: "Rigid PVC pressure PN16",
    polyethylene: "Polyethylene (PE)",

    // Section 5: Pipe diameter
    section5Title: "Pipe diameters",
    dnSuction: "DN suction",
    dnReturn: "DN return",

    // Section 6: Water velocity
    section6Title: "Water flow velocity",
    section6Description: "Set target water flow velocities.",
    velocitySuction: "Suction velocity (m/s)",
    velocityReturn: "Return velocity (m/s)",
    actualVelocities: "Actual calculated velocities: Suction",

    // Section 7: Filter loss
    section7Title: "Filter head loss",
    section7Description: "Enter the nominal head loss provided by the manufacturer (in mWC).",

    // Section 8: Hydraulic parameters
    section8Title: "Hydraulic parameters",
    totalLengthSuction: "Total suction length (m)",
    totalLengthReturn: "Total return length (m)",
    heightDiff: "Height difference (m)",

    // Section 9: Results
    section9Title: "Hydraulic results",
    totalTDH: "Total TDH loss",
    filterPressure: "Filter pressure",
    linearLossSuction: "Linear suction losses",
    singularLossSuction: "Singular suction losses",
    linearLossReturn: "Linear return losses",
    singularLossReturn: "Singular return losses",

    // Section 10: Cavitation Analysis
    section10Title: "Cavitation Analysis (NPSH)",
    section10Description:
      "The NPSH (Net Positive Suction Head) determines if the pump will cavitate. Cavitation severely damages the pump.",
    altitude: "Site altitude (m)",
    waterTemp: "Water temperature (°C)",
    staticHeight: "Static height (m) - Water level above (+) or below (-) the pump",
    npshRequired: "Pump NPSH required (m) - See manufacturer documentation",
    atmosphericPressure: "Atmospheric pressure",
    vaporPressure: "Water vapor pressure",
    npshAvailable: "NPSH available",
    cavitationMargin: "Safety margin",
    cavitationWarning: "⚠️ Cavitation risk detected!",
    cavitationWarningText:
      "NPSH available is less than NPSH required. The pump will cavitate, causing noise, vibrations and pump damage. Reduce suction losses, increase suction pipe diameter, or install the pump lower.",
    cavitationOK: "✅ No cavitation risk",
    cavitationOKText: "NPSH available is sufficient. The pump will operate without cavitation.",

    // Disclaimer translations
    disclaimer: "Important Disclaimer",
    disclaimerText:
      "This calculation is an approximate approach based on the provided data. The results are not validated and should only serve as a preliminary estimate. This calculation does not account for numerous elements such as the number of elbows, branches, tees, reducers, valves, and other hydraulic circuit singularities. For precise sizing that complies with standards, please consult a qualified professional.",

    // Unit labels
    barUnit: "bar",
    mceUnit: "mWC",

    // PDF export translations
    downloadPDF: "Download PDF",
    sendEmail: "Send by email",
    generating: "Generating...",
    sending: "Sending...",
    emailSent: "Email sent successfully to",
    emailError: "Error sending email",
    pdfError: "Error generating PDF",
  },
  es: {
    // App name
    appName: "Pool Master Calculation",
    appDescription: "Calculadora hidráulica profesional para piscinas",

    // Navigation
    login: "Iniciar sesión",
    signUp: "Registrarse",
    logout: "Cerrar sesión",

    // Home page
    homeTitle: "Calculadora hidráulica profesional para piscinas",
    preciseCalculations: "Cálculos hidráulicos precisos",
    preciseCalculationsDesc: "Ecuaciones de Darcy-Weisbach con factor de fricción Swamee-Jain",
    projectManagement: "Gestión de proyectos",
    projectManagementDesc: "Guarda y gestiona tus cálculos",
    calcSurface: "Cálculo de superficie y volumen",
    filtrationFlow: "Caudal de filtración óptimo",
    headLoss: "Pérdidas de carga lineales y singulares",
    tdhPressure: "TDH y presión del filtro",
    secureAccount: "Cuenta de usuario segura",
    unlimitedProjects: "Almacenamiento ilimitado de proyectos",
    accessAnywhere: "Acceso desde cualquier dispositivo",
    exportResults: "Exportar resultados",
    mobileOptimized: "Optimizado para móviles",
    mobileOptimizedDesc: "Utilizable en obra con tu smartphone o tablet",

    // Auth pages
    loginTitle: "Iniciar sesión",
    loginDescription: "Introduce tus credenciales para acceder a la aplicación",
    signUpTitle: "Crear una cuenta",
    signUpDescription: "Crea tu cuenta para empezar",
    email: "Email",
    password: "Contraseña",
    connecting: "Conectando...",
    signUpAction: "Registrarse",
    noAccount: "¿No tienes cuenta?",
    hasAccount: "¿Ya tienes una cuenta?",

    // Calculator
    calculatorTitle: "Calculadora Hidráulica - Piscina",

    // Section 1: Pool shape
    section1Title: "Elegir forma (con dibujos)",
    rectangular: "Rectangular",
    round: "Redonda",
    oval: "Ovalada",
    length: "Longitud (m)",
    width: "Anchura (m)",
    diameter: "Diámetro (m)",
    avgDepth: "Profundidad media (m)",
    surface: "Superficie",
    volume: "Volumen",

    // Section 2: Filtration
    section2Title: "Filtración (duración ajustable)",
    renewalDuration: "Tiempo de renovación (h, predeterminado 5)",
    recommendedFlow: "Caudal recomendado",

    // Section 3: Fittings
    section3Title: "Elegir piezas de instalación (con dibujos)",
    skimmer: "Skimmer",
    return: "Impulsión",
    mainDrain: "Desagüe de fondo",
    skimmers: "Skimmers",
    returns: "Impulsiones",
    mainDrains: "Desagüe(s) de fondo",

    // Section 4: Pipe material
    section4Title: "Tipo de tubería",
    flexiblePipe: "Tubería flexible para piscina",
    rigidPvcPn10: "PVC rígido presión PN10",
    rigidPvcPn16: "PVC rígido presión PN16",
    polyethylene: "Polietileno (PE)",

    // Section 5: Pipe diameter
    section5Title: "Diámetros de tubería",
    dnSuction: "DN aspiración",
    dnReturn: "DN impulsión",

    // Section 6: Water velocity
    section6Title: "Velocidad de paso del agua",
    section6Description: "Define las velocidades objetivo del flujo de agua.",
    velocitySuction: "Velocidad aspiración (m/s)",
    velocityReturn: "Velocidad impulsión (m/s)",
    actualVelocities: "Velocidades reales calculadas: Aspiración",

    // Section 7: Filter loss
    section7Title: "Pérdida de carga del filtro",
    section7Description: "Indica la pérdida de carga nominal proporcionada por el fabricante (en mCA).",

    // Section 8: Hydraulic parameters
    section8Title: "Parámetros hidráulicos",
    totalLengthSuction: "Longitud total aspiración (m)",
    totalLengthReturn: "Longitud total impulsión (m)",
    heightDiff: "Diferencia de altura (m)",

    // Section 9: Results
    section9Title: "Resultados hidráulicos",
    totalTDH: "Pérdida total TDH",
    filterPressure: "Presión del filtro",
    linearLossSuction: "Pérdidas lineales aspiración",
    singularLossSuction: "Pérdidas singulares aspiración",
    linearLossReturn: "Pérdidas lineales impulsión",
    singularLossReturn: "Pérdidas singulares impulsión",

    // Section 10: Cavitation Analysis
    section10Title: "Análisis de cavitación (NPSH)",
    section10Description:
      "El NPSH (Net Positive Suction Head) determina si la bomba cavitará. La cavitación daña gravemente la bomba.",
    altitude: "Altitud del sitio (m)",
    waterTemp: "Temperatura del agua (°C)",
    staticHeight: "Altura estática (m) - Nivel de agua por encima (+) o por debajo (-) de la bomba",
    npshRequired: "NPSH requerido de la bomba (m) - Ver documentación del fabricante",
    atmosphericPressure: "Presión atmosférica",
    vaporPressure: "Presión de vapor del agua",
    npshAvailable: "NPSH disponible",
    cavitationMargin: "Margen de seguridad",
    cavitationWarning: "⚠️ ¡Riesgo de cavitación detectado!",
    cavitationWarningText:
      "El NPSH disponible es menor que el NPSH requerido. La bomba cavitará, causando ruido, vibraciones y daños a la bomba. Reduzca las pérdidas de aspiración, aumente el diámetro de las tuberías de aspiración o instale la bomba más abajo.",
    cavitationOK: "✅ Sin riesgo de cavitación",
    cavitationOKText: "El NPSH disponible es suficiente. La bomba funcionará sin cavitación.",

    // Disclaimer translations
    disclaimer: "Aviso Importante",
    disclaimerText:
      "Este cálculo es una aproximación basada en los datos proporcionados. Los resultados no están validados y solo deben servir como una estimación preliminar. Este cálculo no tiene en cuenta numerosos elementos como el número de codos, derivaciones, tes, reducciones, válvulas y otras singularidades del circuito hidráulico. Para un dimensionamiento preciso y conforme a las normas, consulte a un profesional cualificado.",

    // Unit labels
    barUnit: "bar",
    mceUnit: "mCA",

    // PDF export translations
    downloadPDF: "Descargar PDF",
    sendEmail: "Enviar por email",
    generating: "Generando...",
    sending: "Enviando...",
    emailSent: "Email enviado exitosamente a",
    emailError: "Error al enviar el email",
    pdfError: "Error al generar el PDF",
  },
  pt: {
    // App name
    appName: "Pool Master Calculation",
    appDescription: "Calculadora hidráulica profissional para piscinas",

    // Navigation
    login: "Entrar",
    signUp: "Cadastrar",
    logout: "Sair",

    // Home page
    homeTitle: "Calculadora hidráulica profissional para piscinas",
    preciseCalculations: "Cálculos hidráulicos precisos",
    preciseCalculationsDesc: "Equações de Darcy-Weisbach com fator de fricção Swamee-Jain",
    projectManagement: "Gerenciamento de projetos",
    projectManagementDesc: "Salve e gerencie seus cálculos",
    calcSurface: "Cálculo de superfície e volume",
    filtrationFlow: "Vazão de filtração ideal",
    headLoss: "Perdas de carga lineares e singulares",
    tdhPressure: "TDH e pressão do filtro",
    secureAccount: "Conta de usuário segura",
    unlimitedProjects: "Armazenamento ilimitado de projetos",
    accessAnywhere: "Acesso de qualquer dispositivo",
    exportResults: "Exportar resultados",
    mobileOptimized: "Otimizado para mobile",
    mobileOptimizedDesc: "Utilizável no canteiro com seu smartphone ou tablet",

    // Auth pages
    loginTitle: "Entrar",
    loginDescription: "Digite suas credenciais para acessar a aplicação",
    signUpTitle: "Criar uma conta",
    signUpDescription: "Crie sua conta para começar",
    email: "Email",
    password: "Senha",
    connecting: "Conectando...",
    signUpAction: "Cadastrar",
    noAccount: "Não tem uma conta?",
    hasAccount: "Já tem uma conta?",

    // Calculator
    calculatorTitle: "Calculadora Hidráulica - Piscina",

    // Section 1: Pool shape
    section1Title: "Escolher forma (com desenhos)",
    rectangular: "Retangular",
    round: "Redonda",
    oval: "Oval",
    length: "Comprimento (m)",
    width: "Largura (m)",
    diameter: "Diâmetro (m)",
    avgDepth: "Profundidade média (m)",
    surface: "Superfície",
    volume: "Volume",

    // Section 2: Filtration
    section2Title: "Filtração (duração ajustável)",
    renewalDuration: "Tempo de renovação (h, padrão 5)",
    recommendedFlow: "Vazão recomendada",

    // Section 3: Fittings
    section3Title: "Escolher peças de instalação (com desenhos)",
    skimmer: "Skimmer",
    return: "Retorno",
    mainDrain: "Dreno de fundo",
    skimmers: "Skimmers",
    returns: "Retornos",
    mainDrains: "Dreno(s) de fundo",

    // Section 4: Pipe material
    section4Title: "Tipo de tubulação",
    flexiblePipe: "Tubulação flexível para piscina",
    rigidPvcPn10: "PVC rígido pressão PN10",
    rigidPvcPn16: "PVC rígido pressão PN16",
    polyethylene: "Polietileno (PE)",

    // Section 5: Pipe diameter
    section5Title: "Diâmetros de tubulação",
    dnSuction: "DN sucção",
    dnReturn: "DN retorno",

    // Section 6: Water velocity
    section6Title: "Velocidade de passagem da água",
    section6Description: "Defina as velocidades alvo do fluxo de água.",
    velocitySuction: "Velocidade sucção (m/s)",
    velocityReturn: "Velocidade retorno (m/s)",
    actualVelocities: "Velocidades reais calculadas: Sucção",

    // Section 7: Filter loss
    section7Title: "Perda de carga do filtro",
    section7Description: "Indique a perda de carga nominal fornecida pelo fabricante (em mCA).",

    // Section 8: Hydraulic parameters
    section8Title: "Parâmetros hidráulicos",
    totalLengthSuction: "Comprimento total sucção (m)",
    totalLengthReturn: "Comprimento total retorno (m)",
    heightDiff: "Diferença de altura (m)",

    // Section 9: Results
    section9Title: "Resultados hidráulicos",
    totalTDH: "Perda total TDH",
    filterPressure: "Pressão do filtro",
    linearLossSuction: "Perdas lineares sucção",
    singularLossSuction: "Perdas singulares sucção",
    linearLossReturn: "Perdas lineares retorno",
    singularLossReturn: "Perdas singulares retorno",

    // Section 10: Cavitation Analysis
    section10Title: "Análise de cavitação (NPSH)",
    section10Description:
      "O NPSH (Net Positive Suction Head) determina se a bomba cavitará. A cavitação danifica gravemente a bomba.",
    altitude: "Altitude do local (m)",
    waterTemp: "Temperatura da água (°C)",
    staticHeight: "Altura estática (m) - Nível de água acima (+) ou abaixo (-) da bomba",
    npshRequired: "NPSH requerido da bomba (m) - Ver documentação do fabricante",
    atmosphericPressure: "Pressão atmosférica",
    vaporPressure: "Pressão de vapor da água",
    npshAvailable: "NPSH disponível",
    cavitationMargin: "Margem de segurança",
    cavitationWarning: "⚠️ Risco de cavitação detectado!",
    cavitationWarningText:
      "O NPSH disponível é menor que o NPSH requerido. A bomba cavitará, causando ruído, vibrações e danos à bomba. Reduza as perdas de sucção, aumente o diâmetro das tubulações de sucção ou instale a bomba mais abaixo.",
    cavitationOK: "✅ Sem risco de cavitação",
    cavitationOKText: "O NPSH disponível é suficiente. A bomba funcionará sem cavitação.",

    // Disclaimer translations
    disclaimer: "Aviso Importante",
    disclaimerText:
      "Este cálculo é uma abordagem aproximada baseada nos dados fornecidos. Os resultados não são validados e devem servir apenas como uma estimativa preliminar. Este cálculo não leva em conta numerosos elementos como o número de cotovelos, derivações, tês, reduções, válvulas e outras singularidades do circuito hidráulico. Para um dimensionamento preciso e em conformidade com as normas, consulte um profissional qualificado.",

    // Unit labels
    barUnit: "bar",
    mceUnit: "mCA",

    // PDF export translations
    downloadPDF: "Baixar PDF",
    sendEmail: "Enviar por email",
    generating: "Gerando...",
    sending: "Enviando...",
    emailSent: "Email enviado com sucesso para",
    emailError: "Erro ao enviar o email",
    pdfError: "Erro ao gerar o PDF",
  },
}

export function getTranslation(lang: Language) {
  return translations[lang] || translations.fr
}
