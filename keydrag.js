

const initDrag = function()
{
  var keys = document.getElementsByClassName("key");
  
  for(var i = 0; i < keys.length; i++)
  {
	keys[i].draggable = true;
	keys[i].ondragstart = dragStartHandler;
  }
  
  var commands = document.getElementsByClassName("command");
  
  for(var i = 0; i < commands.length; i++)
  {
	commands[i].ondragover = dragOverHandler;
    commands[i].ondrop = dropHandler;
  }
};

const dragStartHandler = function(e)
{
  e.dataTransfer.setData("id", e.target.id);
};

const dragOverHandler = function(e)
{
  e.preventDefault();
};

const dropHandler = function(e)
{
  var keyId = e.dataTransfer.getData("id");
  var keyDiv = document.getElementById(keyId);
  
  var commandDiv = e.target;
  
  while(commandDiv.className != "command")
  {
	  commandDiv = commandDiv.parentElement;
	  
	  if(commandDiv == null)
	  {
		  return;
	  }
  }
 
  e.preventDefault(); 
  commandDiv.appendChild(keyDiv);
};

const lookupCommandId = function(keyId)
{
	var keyDiv = document.getElementById(keyId);
	
	while(keyDiv != null)
	{
		if(keyDiv.className == "command")
		{
			return keyDiv.id;
		}
		
		keyDiv = keyDiv.parentElement;
	}

    return "";
};

const blinkKeyAndCommand = function(keyId)
{
	var keyDiv = document.getElementById(keyId);
	
	if(keyDiv != null)
	{
		keyDiv.classList.add("highlightedKey");
		
		var commandId = lookupCommandId(keyId);
		
		var commandDiv = document.getElementById(commandId);
		
		if(commandDiv != null)
		{
			commandDiv.classList.add("highlightedCommand");
		}	
	}
	
	setTimeout(resetHighlights, 100);
};

const resetHighlights = function()
{
  var keys = document.getElementsByClassName("key");
  
  for(var i = 0; i < keys.length; i++)
  {
	  keys[i].classList.remove("highlightedKey");
  }
	
  var commands = document.getElementsByClassName("command");
  
  for(var i = 0; i < commands.length; i++)
  {
	  commands[i].classList.remove("highlightedCommand");
  }
};