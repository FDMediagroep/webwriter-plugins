 const Component = require('substance/ui/Component');
 const $$ = Component.$$;
 const Icon = require('substance/ui/FontAwesomeIcon');
 const genUuid = require('writer/utils/IdGenerator');

function PlanneddateComponent() {
  PlanneddateComponent.super.apply(this, arguments)
}

PlanneddateComponent.Prototype = function() {
  this.getInitialState = function() {
    
    var initialDate = this.context.api
      .getLinkByType('planneddate', 'fdmg/planneddate');

      if (!initialDate || initialDate.length < 1) {
            return { initialDate : { value : '' } }
        } else {
          return { initialDate: initialDate.map(function(initialDate){
            return {value : initialDate['@value'], uuid : initialDate['@uuid'] };
          }).pop()}
        }
  }

  this.render = function() {
    var el = $$('div').addClass('planneddate');

    var timeComponent = 
          $$('div').append(
            $$('input').attr({
                type: 'datetime-local',
                id: 'plannedDate',
                value: this.state.initialDate.value
            }).addClass('form-control').ref('plannedDateInput').on("blur", function (){ this.updateDate() })
          );

    el.append([timeComponent]);

    return el;
  }

  this.updateDate = function() {

    this.deleteDate();

    var newPlannedDate = this.refs.plannedDateInput.val();

    if (newPlannedDate !== '') {
        this.context.api.addLink('planneddate', {
             '@uuid': genUuid(),
             '@type': "fdmg/planneddate",
             '@name' : 'planneddate',
             '@value' : newPlannedDate
        });
    }
  }

  this.deleteDate = function () {
      var api = this.context.api;

      api.getLinkByType('fdmg/planneddate')
          .forEach(function(planneddate) {
              api.removeLinkByUUID('planneddate', planneddate['@uuid']);
      });

  };
}

Component.extend(PlanneddateComponent)
module.exports = PlanneddateComponent
