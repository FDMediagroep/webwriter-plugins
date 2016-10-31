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
            return { initialDate : { date : '', time : '' } }
        } else {
          return { initialDate: initialDate.map(function(initialDate){
            return { date : initialDate['@date'], uuid : initialDate['@uuid'], time : initialDate['@time'] };
          }).pop()}
        }
  }

  this.render = function() {
    var el = $$('div').addClass('planneddate');

    var date = this.state.initialDate.date;
    var time = this.state.initialDate.time;

    var dateComponent =
            $$('input').attr({
                type: 'date',
                id: 'plannedDate',
                value: date,
            }).addClass('form-control date').ref('dateInput').on("blur", function (){ this.updateDate() });

    var timeComponent =
            $$('input').attr({
                type: 'time',
                id: 'plannedTime',
                value: time,
            }).addClass('form-control time').ref('timeInput').on("blur", function (){ this.updateDate() });

    el.append(dateComponent, timeComponent);

    return el;
  }

  this.updateDate = function() {

    this.deleteDate();

    var date = this.refs.dateInput.val();
    var time = this.refs.timeInput.val();

    if (date !== '') {
      this.context.api.addLink('planneddate', {
           '@uuid': genUuid(),
           '@type': "fdmg/planneddate",
           '@name' : 'planneddate',
           '@date' : date,
           '@time' : time
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
